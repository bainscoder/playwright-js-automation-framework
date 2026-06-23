import fs from 'fs';
import path from 'path';

const logoPath = path.join(
  process.cwd(),
  'execution-data',
  'logo.jpeg'
);

const logoDestination = path.join(
  process.cwd(),
  'execution-data',
  'logo.jpeg'
);

const comparisonPath = path.join(
  process.cwd(),
  'execution-data',
  'comparison-data.json'
);

const historyPath = path.join(
  process.cwd(),
  'execution-data',
  'execution-history.json'
);

const outputPath = path.join(
  process.cwd(),
  'execution-data',
  'execution-dashboard.html'
);

function generateDashboard() {

  if (fs.existsSync(logoPath)) {

    fs.copyFileSync(
      logoPath,
      logoDestination
    );

  }

  const data = JSON.parse(
    fs.readFileSync(
      comparisonPath,
      'utf-8'
    )
  );

  const history = JSON.parse(
    fs.readFileSync(
      historyPath,
      'utf-8'
    )
  );

  const lastFiveRuns =
    history.slice(-5);

  const labels =
    lastFiveRuns.map(
      (_, index) =>
      `Run ${index+1}`
    );

  const passedData =
    lastFiveRuns.map(
      (r) => r.passed
    );

  const failedData =
    lastFiveRuns.map(
      (r) => r.failed
    );

  const totalTests =
    data.currentRun.passed +
    data.currentRun.failed;

  const passRate =
    totalTests>0
    ?
    Math.round(
      (
        data.currentRun.passed/
        totalTests
      )*100
    )
    :
    0;

const currentDate =
new Date().toLocaleString();

const html=`

<!DOCTYPE html>

<html>

<head>

<title>
Execution Dashboard
</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{

font-family:Arial,sans-serif;
background:#f4f6f9;
padding:20px;
transition:.3s;

}

.header{

background:
linear-gradient(
135deg,
#0f172a,
#4f46e5,
#7c3aed
);

padding:25px;

border-radius:20px;

display:flex;
justify-content:space-between;
align-items:center;

color:white;

margin-bottom:25px;

box-shadow:
0 8px 30px
rgba(0,0,0,.25);

}

.header-left{

display:flex;
align-items:center;
gap:20px;

}

.logo{

width:80px;
height:80px;

background:white;

padding:8px;

border-radius:12px;

object-fit:contain;

}

h1{

font-size:35px;

}

.subtitle{

margin-top:5px;
opacity:.8;

}

.theme-btn{

border:none;

padding:12px 20px;

border-radius:25px;

cursor:pointer;

font-weight:bold;

background:
rgba(
255,
255,
255,
0.2
);

color:white;

}

.container{

display:flex;
gap:15px;
flex-wrap:wrap;

margin:25px 0;

}

.card{

flex:1;

min-width:180px;

padding:20px;

border-radius:18px;

position:relative;

overflow:hidden;

backdrop-filter:
blur(10px);

box-shadow:
0 8px 25px
rgba(0,0,0,.15);

transition:.3s;

color:white;

}

.card:hover{

transform:
translateY(-8px);

}

.total{
background:linear-gradient(135deg,#2563eb,#60a5fa);
}

.pass{
background:linear-gradient(135deg,#16a34a,#4ade80);
}

.fail{
background:linear-gradient(135deg,#dc2626,#fb7185);
}

.time{
background:linear-gradient(135deg,#9333ea,#c084fc);
}

.rate{
background:linear-gradient(135deg,#ea580c,#fdba74);
}

.icon{

position:absolute;
top:20px;
right:20px;

font-size:28px;

}

.metric{

font-size:40px;
font-weight:bold;
margin-top:15px;

}

.progress{

width:100%;
height:8px;

background:
rgba(
255,
255,
255,
.3
);

margin-top:15px;

border-radius:20px;

overflow:hidden;

}

.progress-fill{

height:100%;
background:white;

}

.chart-row{

display:flex;
gap:15px;
margin-bottom:15px;

}

.chart-half{

flex:1;

}

.chart{

background:white;

padding:20px;

border-radius:16px;

height:320px;

box-shadow:
0px 2px 8px
rgba(0,0,0,.1);

}

canvas{

max-height:220px !important;

}

.footer{

margin-top:20px;

padding:15px;

background:white;

border-radius:12px;

text-align:center;

color:#666;

}

.dark-mode{

background:#0f172a;
color:white;

}

.dark-mode .chart,
.dark-mode .footer{

background:#1e293b;
color:white;

}

@media(max-width:900px){

.chart-row{

flex-direction:column;

}

}

</style>

</head>

<body>

<div class="header">

<div class="header-left">

<img
src="./logo.jpeg"
class="logo"
/>

<div>

<h1>

${data.projectName}

</h1>

<div class="subtitle">

Execution Analytics Dashboard

</div>

</div>

</div>

<button
id="themeToggle"
class="theme-btn">

🌙 Dark Mode

</button>

</div>


<div class="container">

<div class="card total">

<div class="icon">📊</div>

<h3>Total Tests</h3>

<div class="metric">
${totalTests}
</div>

<div class="progress">
<div class="progress-fill" style="width:100%">
</div>
</div>

</div>


<div class="card pass">

<div class="icon">✅</div>

<h3>Passed</h3>

<div class="metric">
${data.currentRun.passed}
</div>

<div class="progress">
<div class="progress-fill" style="width:${passRate}%">
</div>
</div>

</div>


<div class="card fail">

<div class="icon">❌</div>

<h3>Failed</h3>

<div class="metric">
${data.currentRun.failed}
</div>

<div class="progress">
<div class="progress-fill" style="width:${100-passRate}%">
</div>
</div>

</div>


<div class="card time">

<div class="icon">⏱</div>

<h3>Execution Time</h3>

<div class="metric">
${data.currentRun.duration}
</div>

<div class="progress">
<div class="progress-fill" style="width:75%">
</div>
</div>

</div>


<div class="card rate">

<div class="icon">🎯</div>

<h3>Pass Rate</h3>

<div class="metric">
${passRate}%
</div>

<div class="progress">
<div class="progress-fill" style="width:${passRate}%">
</div>
</div>

</div>

</div>


<div class="chart-row">

<div class="chart chart-half">

<h2>
Current vs Previous
</h2>

<canvas id="comparisonChart"></canvas>

</div>

<div class="chart chart-half">

<h2>
Pass / Fail Distribution
</h2>

<canvas id="donutChart"></canvas>

</div>

</div>


<div class="chart">

<h2>
Last 5 Execution Trend
</h2>

<canvas id="trendChart"></canvas>

</div>

<div class="footer">

Generated:
${currentDate}

</div>


<script>

new Chart(
document.getElementById(
'comparisonChart'
),
{
type:'bar',
data:{
labels:['Previous','Current'],
datasets:[
{
label:'Passed',
data:[
${data.previousRun?.passed ?? 0},
${data.currentRun.passed}
]
},
{
label:'Failed',
data:[
${data.previousRun?.failed ?? 0},
${data.currentRun.failed}
]
}
]
}
}
);

new Chart(
document.getElementById(
'donutChart'
),
{
type:'doughnut',
data:{
labels:['Passed','Failed'],
datasets:[
{
data:[
${data.currentRun.passed},
${data.currentRun.failed}
]
}
]
}
}
);

new Chart(
document.getElementById(
'trendChart'
),
{
type:'line',
data:{
labels:
${JSON.stringify(labels)},
datasets:[
{
label:'Passed',
data:
${JSON.stringify(passedData)}
},
{
label:'Failed',
data:
${JSON.stringify(failedData)}
}
]
}
}
);


const themeBtn=
document.getElementById(
'themeToggle'
);

themeBtn.onclick=()=>{

document.body.classList.toggle(
'dark-mode'
);

themeBtn.innerHTML=

document.body.classList.contains(
'dark-mode'
)

?

'☀ Light Mode'

:

'🌙 Dark Mode';

};

</script>

</body>

</html>
`;

fs.writeFileSync(
outputPath,
html
);

console.log(
'Enhanced dashboard created'
);

}

export {
  generateDashboard
};