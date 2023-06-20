let guesses = 0;
let load_more = 1;
let query;
let input = document.getElementById('guess_field');
input.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById('guess_button').click();
    }
})

let key = 'NwZqJIizCWUQrmyTkCYHvW9rNkFsRQ4KF-Hwya-Suks';

function getPics(query, load_more) {
    document.getElementById('guess').elements['guess'].value = '';

    let url = "https://api.unsplash.com/search/photos?query=" +
        query + "&client_id=" + key + "&per_page=50";
    let all_images = '';
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            console.log(data)
            for (let i = 0; i < load_more; i++) {
                let img_link = data.results[i].urls.regular;

                let image_text = `<div class='card' id='ex${i}'>
                <img class='card-img-top' src='`+ img_link + "'></div>"

                all_images += image_text
            }
            // console.log(all_images)
            document.getElementById('pics').innerHTML = all_images;
            $(document).ready(function () {
                $('#ex0').zoom()
                $('#ex1').zoom()
                $('#ex2').zoom()
                $('#ex3').zoom()
                $('#ex4').zoom()
                $('#ex5').zoom()
                $('#ex6').zoom()
                $('#ex7').zoom()
                $('#ex8').zoom()
                $('#ex9').zoom()
                $('#ex10').zoom()
                $('#ex11').zoom()
                $('#ex12').zoom()
                $('#ex13').zoom()
                $('#ex14').zoom()
                $('#ex15').zoom()
                $('#ex16').zoom()
                $('#ex17').zoom()
                $('#ex18').zoom()
                $('#ex19').zoom()
                $('#ex20').zoom()
            })
        }
    }

    xhttp.open('GET', url, true);
    xhttp.send();
}

function play() {
    guesses = 0;
    load_more = 1;
    document.getElementById('guesses').innerHTML = '';
    document.getElementById('number_loaded').innerHTML = '';
    number = Math.floor(Math.random() * 100);
    query = word_list[number];
    console.log(query)
    getPics(query, 1);
    load_more = 1

    document.getElementById('pics').style.justifyContent = 'center';
    document.getElementById('showMore').style.display = 'inline';
    document.getElementById('guess').elements['guess'].setAttribute('placeholder', '');
    document.getElementById('guess').elements['guess'].value = '';
    document.getElementById('giveUp').style.display = 'inline';
}

function showMore() {
    if (load_more < 20) {
        load_more += 1;
        getPics(query, load_more);

        document.getElementById('number_loaded').innerHTML =
            "Number of Photos Loaded: " + load_more;

        if (load_more > 3) {
            document.getElementById('pics').style.justifyContent = 'flex-start';
        }

    } else {
        alert("Can't load anymore. :(")
    }
}

function Check() {
    // if no images are shown, which means play button never pressed
    // if no guess was entered
    // if guess is correct or wrong
    let guess = document.getElementById('guess').elements['guess'].value;
    if (document.getElementById('pics').querySelectorAll('img').length == 0) {
        document.getElementById('guess').elements['guess'].setAttribute('placeholder',
            'Click the Play Button First!');
    } else if (guess == '') {
        document.getElementById('guess').elements['guess'].setAttribute('placeholder',
            'Enter your guess!');
    } else {
        if (guess == query) {
            alert('Congrats you got it right');
            document.getElementById('guesses').innerHTML = '';
            document.getElementById('number_loaded').innerHTML = '';
            all_images = '';
            guesses += 1;
            let score = 101 - ((guesses) * load_more);
            if (score < 0) {
                score = 0;
            }

            document.getElementById('pics').innerHTML = `
            <div id='message'>
            <h2> Pretty Good :D </h2>
            <p>Guesses: &nbsp; ${guesses}</p>
            <p>Pics Loaded: &nbsp; ${load_more} </p>
            <p>Score: &nbsp; ${score}
            <p>Let's play again :) </p>
            </p>
            <button class='btn btn-warning' onclick = 'play()'> Play again </button>
            </div>
            `

            document.getElementById('showMore').style.display = 'none';
            document.getElementById('giveUp').style.display = 'none';
            document.getElementById('guess_field').value = ""
            guesses = 0;
            load_more = 1;
        }else{
            guesses += 1;
            document.getElementById('guesses').innerHTML = "Guesses Made:" + guesses; 

            document.getElementById('guess').elements['guess'].setAttribute('placeholder',
            'PLEASE TRY AGAIN'
            )

            document.getElementById('guess').elements['guess'].value = ''
        }
    }
}

function giveUp_function(){
    document.getElementById('guesses').innerHTML = '';
    document.getElementById('number_loaded').innerHTML = '';

    all_images = '';
    document.getElementById('pics').innerHTML = `
    <div id='message'>
    <h2>Don't give up!!!<br> The answer was '${query}'</h2>
    <p>Guesses: &nbsp; ${guesses} </p>
    <p>Pics loaded: &nbsp; ${load_more} </p>
    <p>Score: 0 </p>
    <p>Let's play again :) </p>
    <button class = 'btn btn-warning' onclick = 'play()'>
    Play again
    </button>
    </div>
    `
    guesses = 0;
    load_more = 1;

    document.getElementById('showMore').style.display = 'none';
    document.getElementById('giveUp').style.display = 'none';
    document.getElementById('guess_field').value = '';
}