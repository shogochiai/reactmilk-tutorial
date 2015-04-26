(function(){
  milkcocoa.getCurrentUser( (err, user) => {
    var isLoggedIn = (err == null);
    if(isLoggedIn){
      milkcocoa.dataStore("tweets").query({}).done((tweets)=>{
        React.render(<FEED tweets={tweets} user={user} />, document.body);
      });
    } else {
      React.render(<LP />, document.body);
    }
  });
}());
