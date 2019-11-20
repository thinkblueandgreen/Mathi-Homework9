const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var generateHTML = require("./generateHTML");
const path = require("path")
var convertapi = require("convertapi")("yeCynSawpRtd0VHX");
​
function promptUser() {
    return inquirer
        .prompt([{
            message: "Enter your GitHub username",
            name: "username"
        }, {
            type: "list",
            message: "Choose a color",
            name: "selectColor",
            choices: ["green", "red", "blue", "pink"]
        }])
}
​
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
    return promptUser().then(function({ username, selectColor }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        axios
            .get(queryUrl)
            .then(function(response) {
                const res = response.data;
                response.data.color = selectColor;
                const name = res.name;
                const userBio = res.bio;
                const publicRepos = res.public_repos;
                const followers = res.followers;
                const starred = res.starred_url.split(",")
                res.stars = starred.length;
                const following = res.following;
​
                console.log(res)
                console.log(name, `\n`, userBio, `\n`, publicRepos, `\n`, followers, `\n`, following)
​
                const html = generateHTML(res);
                writeToFile("resume.html", html);
            })
        convertapi.convert('pdf', { File: './resume.html' })
            .then(function(result) {
                // get converted file url
                console.log("Converted file url: " + result.file.url);
                // save to file
                return result.file.save(__dirname + "/resume.pdf");
            })
            .then(function(file) {
                console.log("File saved: " + file);
            });
    })
}
​
​
init()



// const fs = require("fs");
// const axios = require("axios");
// const inquirer = require("inquirer");
// var pdf = require("html-pdf");
// const util = require("util");

// const questions = [
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "What is your name?",
//             name: "name"
//         },
//         {
//             type: "checkbox",
//             message: "what is your favorite color?",
//             name: "colors",
//             choices: [
//                 "green",
//                 "blue",
//                 "pink",
//                 "red"
//             ]
//         }
//     ]);

// ];

// // Step 1: Read information from GIT

// inquirer
//   .prompt({
//     message: "Enter your GitHub username:",
//     name: "username"
//   })
//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//     axios.get(queryUrl).then(function(data) {
//         var imgshot = data.avatar_url
//         var name = data.name
//         var location = data.location
//         var github = data.html_url
//         var blog = data.blog
//         var profileLine = data.bio
//         var publicRepo = data.public_repos
//         var followers = data.followers
//         var githubStars = data.
//         var following = data.following
//       return imgshot, name, location, github, blog, profileLine, publicRepo, followers, githubStars, following;
//     });
//   });

// // Step 2: Form the html text
// function generateHTML(data) {
//     return `<!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
//         <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
//         <title>Document</title>
//         <style>
//             @page {
//               margin: 0;
//             }
//            *,
//            *::after,
//            *::before {
//            box-sizing: border-box;
//            }
//            html, body {
//            padding: 0;
//            margin: 0;
//            }
//            html, body, .wrapper {
//            height: 100%;
//            }
//            .wrapper {
//            background-color: ${colors[data.color].wrapperBackground};
//            padding-top: 100px;
//            }
//            body {
//            background-color: white;
//            -webkit-print-color-adjust: exact !important;
//            font-family: 'Cabin', sans-serif;
//            }
//            main {
//            background-color: #E9EDEE;
//            height: auto;
//            padding-top: 30px;
//            }
//            h1, h2, h3, h4, h5, h6 {
//            font-family: 'BioRhyme', serif;
//            margin: 0;
//            }
//            h1 {
//            font-size: 3em;
//            }
//            h2 {
//            font-size: 2.5em;
//            }
//            h3 {
//            font-size: 2em;
//            }
//            h4 {
//            font-size: 1.5em;
//            }
//            h5 {
//            font-size: 1.3em;
//            }
//            h6 {
//            font-size: 1.2em;
//            }
//            .photo-header {
//            position: relative;
//            margin: 0 auto;
//            margin-bottom: -50px;
//            display: flex;
//            justify-content: center;
//            flex-wrap: wrap;
//            background-color: ${colors[data.color].headerBackground};
//            color: ${colors[data.color].headerColor};
//            padding: 10px;
//            width: 95%;
//            border-radius: 6px;
//            }
//            .photo-header img {
//            width: 250px;
//            height: 250px;
//            border-radius: 50%;
//            object-fit: cover;
//            margin-top: -75px;
//            border: 6px solid ${colors[data.color].photoBorderColor};
//            box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
//            }
//            .photo-header h1, .photo-header h2 {
//            width: 100%;
//            text-align: center;
//            }
//            .photo-header h1 {
//            margin-top: 10px;
//            }
//            .links-nav {
//            width: 100%;
//            text-align: center;
//            padding: 20px 0;
//            font-size: 1.1em;
//            }
//            .nav-link {
//            display: inline-block;
//            margin: 5px 10px;
//            }
//            .workExp-date {
//            font-style: italic;
//            font-size: .7em;
//            text-align: right;
//            margin-top: 10px;
//            }
//            .container {
//            padding: 50px;
//            padding-left: 100px;
//            padding-right: 100px;
//            }
  
//            .row {
//              display: flex;
//              flex-wrap: wrap;
//              justify-content: space-between;
//              margin-top: 20px;
//              margin-bottom: 20px;
//            }
  
//            .card {
//              padding: 20px;
//              border-radius: 6px;
//              background-color: ${colors[data.color].headerBackground};
//              color: ${colors[data.color].headerColor};
//              margin: 20px;
//            }
           
//            .col {
//            flex: 1;
//            text-align: center;
//            }
  
//            a, a:hover {
//            text-decoration: none;
//            color: inherit;
//            font-weight: bold;
//            }
  
//            @media print { 
//             body { 
//               zoom: .75; 
//             } 
//            }
//         </style>
//     </head>
//     <body>
// </html>`

// }

// // Step 3: Write html text to html file
// function writeToFile(`${name}.html`, data) {
//     fs.writeFile(`${name}.html`, repoNamesStr, function(err) {
//         if (err) {
//           throw err;
//         }
//         console.log("Successfully wrote to name.html");
//       });

// }
// async function init() {
//     console.log("hi")
//     try {
//         const answers = await promptUser({ username });
//         const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
//         const html = generateHTML(answers);

//         await writeFileAsync("index.html", html);

//         console.log("Successfully wrote to index.html");
//     } catch (err) {
//         console.log(err);
//     }
// }

// init();

// // Step 4: Convert html to pdf
// var html = fs.readFileSync(`${name}.html`, 'utf8');
// var options = { format: 'Letter' };
 
// pdf.create(html, options).toFile(`.${name}.pdf`, function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: `.${name}.pdf` }
// });







