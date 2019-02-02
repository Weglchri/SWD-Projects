const hbs = require('handlebars');
const layout = require('./layout');

hbs.registerPartial('front',
    `<section>
        <form action="/start">
            <label>Searching stream for term:</label>
            <input type="text" name="term" placeholder="Hello...">
            <input type="submit" value="Start Mining">
        </form>
     </sction>
`);


hbs.registerPartial('miner',
    `<script>
      setTimeout(function () { window.location = "/stop"; }, {{timeout}});
     </script>

    <style>
    .loader {
      border: 5px solid #f3f3f3;
      border-radius: 50%;
      border-top: 5px solid #3498db;
      width: 10px;
      height: 10px;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    </style>
    
    <section>
    <table>
        <tr>
            <th>
                <form action="/stop">
                    <input type="submit" value="Stop Mining">
                </form>
            </th>
            <th>
                <div class="loader"></div>
            </th>
        </tr>
    </table>
    </sction>
`);

hbs.registerPartial('stop',
    `<section>
        <form action="/">
            <input type="submit" value="Back">
        </form>
    </sction>
    <section>
            <div id="container" style="width: 500px; height: 400px;"></div>
            <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-base.min.js" type="text/javascript"></script>
    </section>
     <script>
                anychart.onDocumentReady(function() {
                    
                    var chart = anychart.pie([
                        {{#each dataMap}}
                            ["{{@key}}", {{this}}],
                        {{/each}}
                                    
                    ]);

                    chart.title("From where the term was teweeted");
                    chart.container("container");
                    chart.draw();
                });
     </script>
`);


function newFrontPage () {
    return layout({bodypartial:'front', title: "FrontPage"});
}

function newMinerView (data) {
    return layout(Object.assign(data,{bodypartial:'miner', title:'MinerPage'}));
}

function newStopPage (data) {
    return layout(Object.assign(data, {bodypartial:'stop', title:'MinerPage'}));
}


module.exports = {
    getFrontPage: newFrontPage,
    getMinerPage: newMinerView,
    getStopPage: newStopPage,
}