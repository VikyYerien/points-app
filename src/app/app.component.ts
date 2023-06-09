import { Component, VERSION, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang-points-app';

  players: any = [];
  model: any = {};
  localStorage: any = localStorage.getItem("players");

  saveLocalStorage(){
    localStorage.setItem("players", JSON.stringify(this.players));
  }

  ngOnInit() {
    if (localStorage.getItem("players")){
      this.players = JSON.parse(this.localStorage);
    }
    console.log(this.players);
  }

  addPlayer():void{
    let newPlayer= {name: this.model.name, score: [0], scoreAdd: null};
    let longitudMax= 25;
    let  txtValid= true;
    let reg= new RegExp('^[A-Z\u00D1\u00F1\u0020]+$', 'i');

    if(this.model.name != null){
      if (this.model.name.length > 8){
        alert("Name is too long");
        txtValid= false;
      }
  
      if (!reg.test(this.model.name)){
        alert("invalid name")
        txtValid= false;
      }
  
      if(this.model.name.trim()==""){
        alert("Introduce a name");
        txtValid= false;
      }
  
      if(txtValid){
        this.players.push(newPlayer);
        this.model = {};
        this.saveLocalStorage();

      } else {
        this.model.name = null;
      }
    } else {
      alert("Introduce a name");
    }

  }

  reset(){
    this.players = [];
    localStorage.clear();
  }

  sumScore(i:number){
    let prevScore = this.players[i].score[this.players[i].score.length-1];
    let scoreTosum = this.players[i].scoreAdd;
    if(scoreTosum <= 9999){
      let sum = prevScore + scoreTosum;
      this.players[i].score.push(sum);
      this.players[i].scoreAdd = null;
      this.saveLocalStorage();
    } else {
      this.players[i].scoreAdd = null;
    }
  }

  undoSumScore(i:number){
    if(this.players[i].score.length > 1){
      this.players[i].score.pop();
    }
    this.saveLocalStorage();
  }

  deletePlayer(i:number){
    this.players.splice(i,1);
    this.saveLocalStorage();
  }

  resetScore(){
    for(let i = 0; i < this.players.length; i++){
      this.players[i].score = [0];
    }
    this.saveLocalStorage();
  }

}