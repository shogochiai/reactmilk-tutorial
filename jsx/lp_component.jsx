(function(global){

  var LP = React.createClass({
    render(){
      return (<div>
        <h1>Not Logged In Now.</h1>
        <div>
          <input type="text" id="email-login" placeholder="email" />
          <input type="password" id="password-login" placeholder="password" />
          <button onClick={this.onLoginClick}>Login</button>
        </div>
        <div>
          <input type="text" id="email-signup" placeholder="email" />
          <input type="password" id="password-signup" placeholder="password" />
          <button onClick={this.onSignupClick}>Signup</button>
        </div>
      </div>);
    },
    onLoginClick(e){
      var email = document.getElementById("email-login").value;
      var password = document.getElementById("password-login").value;
      milkcocoa.login(email,password,(err, user)=>{
        if(err == null) alert("logged in");
        location.reload();
      });
    },
    onSignupClick(e){
      var email = document.getElementById("email-signup").value;
      var password = document.getElementById("password-signup").value;
      milkcocoa.addAccount(email,password,(err, user)=>{
        if(err == null) alert("signed up"); 
        location.reload();
      });
    }
  });

  global.LP = LP;
  return global;
}(window));
