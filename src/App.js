import React from 'react';
import logo from './logo.svg';
import './App.scss';


function Display(props){
  return(
    <div className="calculator__display">
      <div className="calculator__history">{props.history}</div>
      <div className="calculator__curent">{props.curent}</div>
    </div>
  )

}

function Digits(props){
  const keys = ["%","+/-","C",7,8,9,4,5,6,1,2,3,0,","];
  const item = keys.map((v)=><input type="button" value={v} onClick={props.handleClick} />)
  return(
    <div className="calculator__digit">
      {item}
    </div>

  )
}

function Functions(props){
  const keys = ["/","*","-","+","="];

  const item = keys.map((v)=>
      <input type="button" 
        value={v} 
        className={v==="=" ? "result" : ""}
        onClick={v==="=" ? props.result : props.handleClick}
      />
    )
  return(
    <div className="calculator__functions">
      {item}
    </div>
  )
}

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      curent: 0,
      history: ''
    }

    this.handleClick=this.handleClick.bind(this);
    this.handleFunctions=this.handleFunctions.bind(this);
    this.result=this.result.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    const value = e.target.value
    const curent = this.state.curent


    const operation = {
      "%": (v)=>v/100,
      "+/-": (v)=>-v,
      ",": (v)=>v+"."
    }

    if(!isNaN(value)){
      let number;
      if(isNaN(curent) || curent===0)
        number = value;
      else
        number = curent +""+ value;
      this.setState({curent: number});
    }
    else if(value=="C"){
      this.setState({curent: 0, history:""});
    }
    else
      this.setState({curent: operation[value](curent) })
  }

  handleFunctions(e){
    e.preventDefault();

    const value = e.target.value;
    const curent = this.state.curent;
    if(!isNaN(curent)){
      const history = this.state.history + curent + value;
      this.setState({history: history, curent: value});
    }

  }

  result(e){
    e.preventDefault();

    const history = this.state.history + this.state.curent;

    this.setState({
      curent: eval(history),
      history: ""
    })
  }



  render(){
    return (
      <div className="calculator">
        <Display history={this.state.history} curent={this.state.curent} />
        <div className="calculator__keyboard">
          <Digits handleClick={this.handleClick}/>
          <Functions handleClick={this.handleFunctions} result={this.result}/>
        </div>
      </div>
    );
  }
}

export default App;
