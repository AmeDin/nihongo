import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { CardText, CardSubtitle, Button, Form, Input} from 'reactstrap';
import './clock.css'
import night from '../../img/timeOfDay/night.jpg'
import day from '../../img/timeOfDay/day.jpg'
import dusk from '../../img/timeOfDay/dusk-dawn.jpg'
import dawn from '../../img/timeOfDay/dusk-dawn2.png'

export class Clock extends Component {

    constructor(props) {
        super(props);
  
        this.state = { time: new Date(), validateText: '', guess: '' };
        this.radius = this.props.size / 2;
        this.drawingContext = null;
        this.draw24hour = this.props.timeFormat.toLowerCase().trim() === "24hour";
        this.drawRoman = !this.draw24hour && this.props.hourFormat.toLowerCase().trim() === "roman";
  
     }

    static propTypes = {
        size: PropTypes.number,
        timeFormat: PropTypes.string,
        hourFormat: PropTypes.string
    }

    componentDidMount() {
        this.getDrawingContext();
        this.tick();
     }
  
    componentWillUnmount() {
        document.body.style.backgroundImage = "url('')"
    }

  
    getDrawingContext() {
        this.drawingContext = this.refs.clockCanvas.getContext('2d');
        this.drawingContext.translate(this.radius, this.radius);
        this.radius *= 0.9;
    }
  
    tick() {
        const start = new Date(2019,9,1);
        const end =  new Date()
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        this.setState({ 
            time: date, 
            guess: '',
            validateText: ''}, 
            () => { 
                console.log(this.state) 
                const radius = this.radius;
                let ctx = this.drawingContext;
                this.drawFace(ctx, radius);
                this.drawNumbers(ctx, radius, date.getHours());
                this.drawTicks(ctx, radius);
                this.drawTime(ctx, radius);
                this.setBackground(date.getHours());
        });
    }
  
    drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(0,0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
  
        const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, "#333");
        grad.addColorStop(0.5, "white");
        grad.addColorStop(1, "#333");
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();
  
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
        ctx.fillStyle = "#333";
        ctx.fill();
     }
  
    drawNumbers(ctx, radius, hour) {
        const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
        const fontBig = radius * 0.15 + "px Arial";
        const fontSmall = radius * 0.075 + "px Arial";
        let ang, num;
  
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
           ang = num * Math.PI / 6;
           ctx.rotate(ang);
           ctx.translate(0, -radius * 0.78);
           ctx.rotate(-ang);
           ctx.font = fontBig;
           ctx.fillStyle = "black";
           ctx.fillText(this.drawRoman ? romans[num-1] : num.toString(), 0, 0);
           ctx.rotate(ang);
           ctx.translate(0, radius * 0.78);
           ctx.rotate(-ang);
  
           // Draw inner numerals for 24 hour time format
           if (this.draw24hour) {
              ctx.rotate(ang);
              ctx.translate(0, -radius * 0.60);
              ctx.rotate(-ang);
              ctx.font = fontSmall;
              ctx.fillStyle = "red";
              ctx.fillText((num + 12).toString(), 0, 0);
              ctx.rotate(ang);
              ctx.translate(0, radius * 0.60);
              ctx.rotate(-ang);
           }
        }
        ctx.font = fontBig;
        ctx.translate(0, radius * 0.30);
        console.log(hour) 
        if(hour < 12)
            ctx.fillText("AM", 0, 0)
        else
            ctx.fillText("PM", 0, 0)
        ctx.translate(0, -radius * 0.30);
    }
  
    drawTicks(ctx, radius) {
        let numTicks, tickAng, tickX, tickY;
  
        for (numTicks = 0; numTicks < 60; numTicks++) {
  
           tickAng = (numTicks * Math.PI / 30);
           tickX = radius * Math.sin(tickAng);
           tickY = -radius * Math.cos(tickAng);
  
           ctx.beginPath();
           ctx.lineWidth = radius * 0.010;
           ctx.moveTo(tickX, tickY);
           if (numTicks % 5 === 0) {
              ctx.lineTo(tickX * 0.88, tickY * 0.88);
           } else {
              ctx.lineTo(tickX * 0.92, tickY * 0.92);
           }
           ctx.stroke();
        }
    }
  
    drawTime(ctx, radius) {
        const now = this.state.time;
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
  
        // hour
        hour %= 12;
        hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
        this.drawHand(ctx, hour, radius * 0.5, radius * 0.05);
        // minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        this.drawHand(ctx, minute, radius * 0.8, radius * 0.05);
        // second
        second = (second * Math.PI / 30);
        this.drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
    }
  
    drawHand(ctx, position, length, width, color) {
        color = color || "black";
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.moveTo(0, 0);
        ctx.rotate(position);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-position);
    }

    setBackground(hour){
        console.log("hi" + hour)
        if(hour > 8 && hour < 18)
            document.body.style.backgroundImage = "url(" + day + ")"
        else if(hour < 6 || hour > 19 )
            document.body.style.backgroundImage = "url(" + night + ")";
        else if(hour === 6)
            document.body.style.backgroundImage = "url(" + dawn + ")";
        else if(hour === 8)
            document.body.style.backgroundImage = "url(" + dusk + ")";
        else if(hour === 18)
            document.body.style.backgroundImage = "url(" + dusk + ")";
        else if(hour === 19)
            document.body.style.backgroundImage = "url(" + dawn + ")";
    }

    
    updateValidateText = (value) => {
        this.setState({ 
          validateText : value
      });
    }

    onChange = (e) => {
        this.setState({ 
            guess : e.target.value
        });
        console.log(this.state)
    }

    onSubmit = (e) => {
        e.preventDefault();
        var success = false;

        const now = this.state.time;
        const guess = this.state.guess;
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        const hourMapRomaji = [
            {hour: 1, romaji: 'ichi-ji'},
            {hour: 2, romaji: 'ni-ji'},
            {hour: 3, romaji: 'san-ji'},
            {hour: 4, romaji: 'yo-ji'},
            {hour: 5, romaji: 'go-ji'},
            {hour: 6, romaji: 'roku-ji'},
            {hour: 7, romaji: 'shichi-ji'},
            {hour: 8, romaji: 'hachi-ji'},
            {hour: 9, romaji: 'ku-ji'},
            {hour: 10, romaji: 'ju-ji'},
            {hour: 11, romaji: 'juichi-ji'},
            {hour: 12, romaji: 'juni-ji'},
            {hour: 13, romaji: 'ichi-ji'},
            {hour: 14, romaji: 'ni-ji'},
            {hour: 15, romaji: 'san-ji'},
            {hour: 16, romaji: 'yo-ji'},
            {hour: 17, romaji: 'go-ji'},
            {hour: 18, romaji: 'roku-ji'},
            {hour: 19, romaji: 'shichi-ji'},
            {hour: 20, romaji: 'hachi-ji'},
            {hour: 21, romaji: 'ku-ji'},
            {hour: 22, romaji: 'ju-ji'},
            {hour: 23, romaji: 'juichi-ji'},
            {hour: 0, romaji: 'juni-ji'}
        ]

        const hourMapHiragana = [
            {hour: 1, hiragana: 'いち-じ'},
            {hour: 2, hiragana: 'に-じ'},
            {hour: 3, hiragana: 'さん-じ'},
            {hour: 4, hiragana: 'よ-じ'},
            {hour: 5, hiragana: 'ご-じ'},
            {hour: 6, hiragana: 'ろく-じ'},
            {hour: 7, hiragana: 'しち-じ'},
            {hour: 8, hiragana: 'はち-じ'},
            {hour: 9, hiragana: 'く-じ'},
            {hour: 10, hiragana: 'じゅ-じ'},
            {hour: 11, hiragana: 'じゅいち-じ'},
            {hour: 12, hiragana: 'じゅに-じ'},
            {hour: 13, hiragana: 'いち-じ'},
            {hour: 14, hiragana: 'に-じ'},
            {hour: 15, hiragana: 'さん-じ'},
            {hour: 16, hiragana: 'よ-じ'},
            {hour: 17, hiragana: 'ご-じ'},
            {hour: 18, hiragana: 'ろく-じ'},
            {hour: 19, hiragana: 'しち-じ'},
            {hour: 20, hiragana: 'はち-じ'},
            {hour: 21, hiragana: 'く-じ'},
            {hour: 22, hiragana: 'じゅ-じ'},
            {hour: 23, hiragana: 'じゅいち-じ'},
            {hour: 0, hiragana: 'じゅに-じ'},
        ]

        const minutesMapRomaji = [
            {minute: 1, romaji: 'ip-pun'},
            {minute: 2, romaji: 'ni-fun'},
            {minute: 3, romaji: 'san-pun'},
            {minute: 4, romaji: 'yon-pun'},
            {minute: 5, romaji: 'go-fun'},
            {minute: 6, romaji: 'rop-pun'},
            {minute: 7, romaji: 'nana-fun'},
            {minute: 8, romaji: 'hap-pun'},
            {minute: 9, romaji: 'kyu-fun'},
            {minute: 10, romaji: 'jup-pun'},
            {minute: 11, romaji: 'juip-pun'},
            {minute: 12, romaji: 'juni-fun'},
            {minute: 13, romaji: 'jusan-pun'},
            {minute: 14, romaji: 'juyon-pun'},
            {minute: 15, romaji: 'jugo-fun'},
            {minute: 16, romaji: 'jurop-pun'},
            {minute: 17, romaji: 'junana-fun'},
            {minute: 18, romaji: 'juhap-pun'},
            {minute: 19, romaji: 'jukyu-fun'},
            {minute: 20, romaji: 'nijup-pun'},
            {minute: 21, romaji: 'nijuip-pun'},
            {minute: 22, romaji: 'nijuni-fun'},
            {minute: 23, romaji: 'nijusan-pun'},
            {minute: 24, romaji: 'nijuyon-pun'},
            {minute: 25, romaji: 'nijugo-fun'},
            {minute: 26, romaji: 'nijurop-pun'},
            {minute: 27, romaji: 'nijunana-fun'},
            {minute: 28, romaji: 'nijuhap-pun'},
            {minute: 29, romaji: 'nijukyu-fun'},
            {minute: 30, romaji: 'sanjup-pun'},
            {minute: 31, romaji: 'sanjuip-pun'},
            {minute: 32, romaji: 'sanjuni-fun'},
            {minute: 33, romaji: 'sanjusan-pun'},
            {minute: 34, romaji: 'sanjuyon-pun'},
            {minute: 35, romaji: 'sanjugo-fun'},
            {minute: 36, romaji: 'sanjurop-pun'},
            {minute: 37, romaji: 'sanjunana-fun'},
            {minute: 38, romaji: 'sanjuhap-pun'},
            {minute: 39, romaji: 'sanjukyu-fun'},
            {minute: 40, romaji: 'yonjup-pun'},
            {minute: 41, romaji: 'yonjuip-pun'},
            {minute: 42, romaji: 'yonjuni-fun'},
            {minute: 43, romaji: 'yonjusan-pun'},
            {minute: 44, romaji: 'yonjuyon-pun'},
            {minute: 45, romaji: 'yonjugo-fun'},
            {minute: 46, romaji: 'yonjurop-pun'},
            {minute: 47, romaji: 'yonjunana-fun'},
            {minute: 48, romaji: 'yonjuhap-pun'},
            {minute: 49, romaji: 'yonjukyu-fun'},
            {minute: 50, romaji: 'gojup-pun'},
            {minute: 51, romaji: 'gojuip-pun'},
            {minute: 52, romaji: 'gojuni-fun'},
            {minute: 53, romaji: 'gojusan-pun'},
            {minute: 54, romaji: 'gojuyon-pun'},
            {minute: 55, romaji: 'gojugo-fun'},
            {minute: 56, romaji: 'gojurop-pun'},
            {minute: 57, romaji: 'gojunana-fun'},
            {minute: 58, romaji: 'gojuhap-pun'},
            {minute: 59, romaji: 'gojukyu-fun'}
        ]

        
        const minutesMapHiragana = [
            {minute: 1, hiragana: 'いっぷん'},
            {minute: 2, hiragana: 'にふん'},
            {minute: 3, hiragana: 'さんぷん'},
            {minute: 4, hiragana: 'よんぷん'},
            {minute: 5, hiragana: 'ごふん'},
            {minute: 6, hiragana: 'ろっぷん'},
            {minute: 7, hiragana: 'ななふん'},
            {minute: 8, hiragana: 'はっぷん'},
            {minute: 9, hiragana: 'きゅふん'},
            {minute: 10, hiragana: 'じゅっぷん'},
            {minute: 11, hiragana: 'じゅいっぷん'},
            {minute: 12, hiragana: 'じゅにふん'},
            {minute: 13, hiragana: 'じゅさんぷん'},
            {minute: 14, hiragana: 'じゅよんぷん'},
            {minute: 15, hiragana: 'じゅごふん'},
            {minute: 16, hiragana: 'じゅろっぷん'},
            {minute: 17, hiragana: 'じゅななふん'},
            {minute: 18, hiragana: 'じゅはっぷん'},
            {minute: 19, hiragana: 'じゅきゅふん'},
            {minute: 20, hiragana: 'にじゅっぷん'},
            {minute: 21, hiragana: 'にじゅいっぷん'},
            {minute: 22, hiragana: 'にじゅにふん'},
            {minute: 23, hiragana: 'にじゅさんぷん'},
            {minute: 24, hiragana: 'にじゅよんぷん'},
            {minute: 25, hiragana: 'にじゅごふん'},
            {minute: 26, hiragana: 'にじゅろっぷん'},
            {minute: 27, hiragana: 'にじゅななふん'},
            {minute: 28, hiragana: 'にじゅはっぷん'},
            {minute: 29, hiragana: 'にじゅきゅふん'},
            {minute: 30, hiragana: 'さんじゅっぷん'},
            {minute: 31, hiragana: 'さんじゅいっぷん'},
            {minute: 32, hiragana: 'さんじゅにふん'},
            {minute: 33, hiragana: 'さんじゅさんぷん'},
            {minute: 34, hiragana: 'さんじゅよんぷん'},
            {minute: 35, hiragana: 'さんじゅごふん'},
            {minute: 36, hiragana: 'さんじゅろっぷん'},
            {minute: 37, hiragana: 'さんじゅななふん'},
            {minute: 38, hiragana: 'さんじゅはっぷん'},
            {minute: 39, hiragana: 'さんじゅきゅふん'},
            {minute: 40, hiragana: 'よんじゅっぷん'},
            {minute: 41, hiragana: 'よんじゅいっぷん'},
            {minute: 42, hiragana: 'よんじゅにふん'},
            {minute: 43, hiragana: 'よんじゅさんぷん'},
            {minute: 44, hiragana: 'よんじゅよんぷん'},
            {minute: 45, hiragana: 'よんじゅごふん'},
            {minute: 46, hiragana: 'よんじゅろっぷん'},
            {minute: 47, hiragana: 'よんじゅななふん'},
            {minute: 48, hiragana: 'よんじゅはっぷん'},
            {minute: 49, hiragana: 'よんじゅきゅふん'},
            {minute: 50, hiragana: 'ごじゅっぷん'},
            {minute: 51, hiragana: 'ごじゅいっぷん'},
            {minute: 52, hiragana: 'ごじゅにふん'},
            {minute: 53, hiragana: 'ごじゅさんぷん'},
            {minute: 54, hiragana: 'ごじゅよんぷん'},
            {minute: 55, hiragana: 'ごじゅごふん'},
            {minute: 56, hiragana: 'ごじゅろっぷん'},
            {minute: 57, hiragana: 'ごじゅななふん'},
            {minute: 58, hiragana: 'ごじゅはっぷん'},
            {minute: 59, hiragana: 'ごじゅきゅふん'}
        ]


        const secondsMapRomaji = [
            {seconds: 1, romaji: 'ichi-byou'},
            {seconds: 2, romaji: 'ni-byou'},
            {seconds: 3, romaji: 'san-byou'},
            {seconds: 4, romaji: 'yon-byou'},
            {seconds: 5, romaji: 'go-byou'},
            {seconds: 6, romaji: 'roku-byou'},
            {seconds: 7, romaji: 'nana-byou'},
            {seconds: 8, romaji: 'hachi-byou'},
            {seconds: 9, romaji: 'kyu-byou'},
            {seconds: 10, romaji: 'ju-byou'},
            {seconds: 11, romaji: 'juichi-byou'},
            {seconds: 12, romaji: 'juni-byou'},
            {seconds: 13, romaji: 'jusan-byou'},
            {seconds: 14, romaji: 'juyon-byou'},
            {seconds: 15, romaji: 'jugo-byou'},
            {seconds: 16, romaji: 'juroku-byou'},
            {seconds: 17, romaji: 'junana-byou'},
            {seconds: 18, romaji: 'juhachi-byou'},
            {seconds: 19, romaji: 'jukyu-byou'},
            {seconds: 20, romaji: 'niju-byou'},
            {seconds: 21, romaji: 'nijuichi-byou'},
            {seconds: 22, romaji: 'nijuni-byou'},
            {seconds: 23, romaji: 'nijusan-byou'},
            {seconds: 24, romaji: 'nijuyon-byou'},
            {seconds: 25, romaji: 'nijugo-byou'},
            {seconds: 26, romaji: 'nijuroku-byou'},
            {seconds: 27, romaji: 'nijunana-byou'},
            {seconds: 28, romaji: 'nijuhachi-byou'},
            {seconds: 29, romaji: 'nijukyu-byou'},
            {seconds: 30, romaji: 'sanju-byou'},
            {seconds: 31, romaji: 'sanjuichi-byou'},
            {seconds: 32, romaji: 'sanjuni-byou'},
            {seconds: 33, romaji: 'sanjusan-byou'},
            {seconds: 34, romaji: 'sanjuyon-byou'},
            {seconds: 35, romaji: 'sanjugo-byou'},
            {seconds: 36, romaji: 'sanjuroku-byou'},
            {seconds: 37, romaji: 'sanjunana-byou'},
            {seconds: 38, romaji: 'sanjuhachi-byou'},
            {seconds: 39, romaji: 'sanjukyu-byou'},
            {seconds: 40, romaji: 'yonju-byou'},
            {seconds: 41, romaji: 'yonjuichi-byou'},
            {seconds: 42, romaji: 'yonjuni-byou'},
            {seconds: 43, romaji: 'yonjusan-byou'},
            {seconds: 44, romaji: 'yonjuyon-byou'},
            {seconds: 45, romaji: 'yonjugo-byou'},
            {seconds: 46, romaji: 'yonjuroku-byou'},
            {seconds: 47, romaji: 'yonjunana-byou'},
            {seconds: 48, romaji: 'yonjuhachi-byou'},
            {seconds: 49, romaji: 'yonjukyu-byou'},
            {seconds: 50, romaji: 'goju-byou'},
            {seconds: 51, romaji: 'gojuichi-byou'},
            {seconds: 52, romaji: 'gojuni-byou'},
            {seconds: 53, romaji: 'gojusan-byou'},
            {seconds: 54, romaji: 'gojuyon-byou'},
            {seconds: 55, romaji: 'gojugo-byou'},
            {seconds: 56, romaji: 'gojuroku-byou'},
            {seconds: 57, romaji: 'gojunana-byou'},
            {seconds: 58, romaji: 'gojuhachi-byou'},
            {seconds: 59, romaji: 'gojukyu-byou'}
        ]

        const secondsMapHiragana = [
            {seconds: 1, hiragana: 'いちびょう'},
            {seconds: 2, hiragana: 'にびょう'},
            {seconds: 3, hiragana: 'さんびょう'},
            {seconds: 4, hiragana: 'よんびょう'},
            {seconds: 5, hiragana: 'ごびょう'},
            {seconds: 6, hiragana: 'ろくびょう'},
            {seconds: 7, hiragana: 'ななびょう'},
            {seconds: 8, hiragana: 'よんびょう'},
            {seconds: 9, hiragana: 'きゅびょう'},
            {seconds: 10, hiragana: 'じゅびょう'},
            {seconds: 11, hiragana: 'じゅいちびょう'},
            {seconds: 12, hiragana: 'じゅにびょう'},
            {seconds: 13, hiragana: 'じゅさんびょう'},
            {seconds: 14, hiragana: 'じゅよんびょう'},
            {seconds: 15, hiragana: 'じゅごびょう'},
            {seconds: 16, hiragana: 'じゅろくびょう'},
            {seconds: 17, hiragana: 'じゅななびょう'},
            {seconds: 18, hiragana: 'じゅよんびょう'},
            {seconds: 19, hiragana: 'じゅきゅびょう'},
            {seconds: 20, hiragana: 'にじゅびょう'},
            {seconds: 21, hiragana: 'にじゅいちびょう'},
            {seconds: 22, hiragana: 'にじゅにびょう'},
            {seconds: 23, hiragana: 'にじゅさんびょう'},
            {seconds: 24, hiragana: 'にじゅよんびょう'},
            {seconds: 25, hiragana: 'にじゅごびょう'},
            {seconds: 26, hiragana: 'にじゅろくびょう'},
            {seconds: 27, hiragana: 'にじゅななびょう'},
            {seconds: 28, hiragana: 'にじゅよんびょう'},
            {seconds: 29, hiragana: 'にじゅきゅびょう'},
            {seconds: 30, hiragana: 'さんじゅびょう'},
            {seconds: 31, hiragana: 'さんゅいちびょう'},
            {seconds: 32, hiragana: 'さんゅにびょう'},
            {seconds: 33, hiragana: 'さんゅさんびょう'},
            {seconds: 34, hiragana: 'さんゅよんびょう'},
            {seconds: 35, hiragana: 'さんゅごびょう'},
            {seconds: 36, hiragana: 'さんゅろくびょう'},
            {seconds: 37, hiragana: 'さんゅななびょう'},
            {seconds: 38, hiragana: 'さんゅよんびょう'},
            {seconds: 39, hiragana: 'さんゅきゅびょう'},
            {seconds: 40, hiragana: 'よんじゅびょう'},
            {seconds: 41, hiragana: 'よんゅいちびょう'},
            {seconds: 42, hiragana: 'よんゅにびょう'},
            {seconds: 43, hiragana: 'よんゅさんびょう'},
            {seconds: 44, hiragana: 'よんゅよんびょう'},
            {seconds: 45, hiragana: 'よんゅごびょう'},
            {seconds: 46, hiragana: 'よんゅろくびょう'},
            {seconds: 47, hiragana: 'よんゅななびょう'},
            {seconds: 48, hiragana: 'よんゅよんびょう'},
            {seconds: 49, hiragana: 'よんゅきゅびょう'},
            {seconds: 50, hiragana: 'ごんじゅびょう'},
            {seconds: 51, hiragana: 'ごゅいちびょう'},
            {seconds: 52, hiragana: 'ごゅにびょう'},
            {seconds: 53, hiragana: 'ごゅさんびょう'},
            {seconds: 54, hiragana: 'ごゅよんびょう'},
            {seconds: 55, hiragana: 'ごゅごびょう'},
            {seconds: 56, hiragana: 'ごゅろくびょう'},
            {seconds: 57, hiragana: 'ごゅななびょう'},
            {seconds: 58, hiragana: 'ごゅよんびょう'},
            {seconds: 59, hiragana: 'ごゅきゅびょう'}
        ]

        const hourRomajiAnswer = hourMapRomaji.find((hourRomaji) => { return hourRomaji.hour === hour })
        const hourHiraganaAnswer = hourMapHiragana.find((hourHiragana) => { return hourHiragana.hour === hour })

        const minutesRomajiAnswer = minutesMapRomaji.find((minuteRomaji) => { return minuteRomaji.minute === minute })
        const minutesHiraganaAnswer = minutesMapHiragana.find((minuteHiragana) => { return minuteHiragana.minute === minute })

        const secondsRomajiAnswer = secondsMapRomaji.find((secondsRomaji) => { return secondsRomaji.seconds === second })
        const secondsHiraganaAnswer = secondsMapHiragana.find((secondsHiragana) => { return secondsHiragana.seconds === second })

        const indicationRomaji = hour < 12 ? "Gozen " : "Gogo ";
        const indicationHiragana = hour < 12 ? "ごぜん " : "ご ";
        const romajiAnswer = indicationRomaji + hourRomajiAnswer.romaji + ' ' + minutesRomajiAnswer.romaji + ' ' + secondsRomajiAnswer.romaji
        const hiraganaAnswer = indicationHiragana + hourHiraganaAnswer.hiragana + ' ' + minutesHiraganaAnswer.hiragana + ' ' + secondsHiraganaAnswer.hiragana

        console.log(romajiAnswer)
        console.log(hiraganaAnswer)

        if(romajiAnswer.toLowerCase() === guess.toLowerCase() ||
        hiraganaAnswer === this.state.guess){
            success = true
        }

        if(minutesRomajiAnswer.romaji === 'sanjup-pun' || minutesHiraganaAnswer.hiragana === 'さんじゅっぷん'){
            const romajiHanAnswer = indicationRomaji + hourRomajiAnswer.romaji + ' han ' + secondsRomajiAnswer.romaji
            const hiraganaHanAnswer = indicationHiragana + hourHiraganaAnswer.hiragana + ' han ' + secondsHiraganaAnswer.hiragana
            if(romajiHanAnswer.toLowerCase() === guess.toLowerCase() ||
                hiraganaHanAnswer === this.state.guess){
                    success = true
                }
        }

        if(success)
        {
            success = false
            this.updateValidateText('Correct')
            document.getElementById('validateText').style.display = 'block'
            setTimeout(function() { //Start the timer
                this.tick()
                this.updateValidateText('')
                document.getElementById('item').value = ''
                document.getElementById('validateText').style.display = 'none'
                
            }.bind(this), 500)
        }else{
          this.updateValidateText('Wrong')
          document.getElementById('validateText').style.display = 'block'
          setTimeout(function() { 
              this.updateValidateText('')
              document.getElementById('validateText').style.display = 'none'
          }.bind(this), 500)
        }

    }

    render() {
        return (
           <div className="Clock" style={{ width: String(this.props.size) + 'px' }}>
              <canvas width={this.props.size} height={this.props.size} ref="clockCanvas"/>
              <Form onSubmit={this.onSubmit}>
              <CardSubtitle>
                  <Input 
                        type="text"
                        name="name"
                        id="item"
                        placeholder="いま なんじ です か?"
                        onChange={this.onChange}
                        style={{margin:'auto', textAlign:'center'}} />
                </CardSubtitle>
                    <CardText id='validateText' style={{display: 'none'}}>{this.state.validateText}</CardText>
                        <Button
                          style={{marginTop: '1rem'}}>Submit</Button>
              </Form>
           </div>
        );
     }
}

Clock.defaultProps = {
    size: 400, // size in pixels => size is length & width
    timeFormat: "24hour", // {standard | 24hour} => if '24hour', hourFormat must be 'standard'
    hourFormat: "standard" // {standard | roman}
};

export default Clock