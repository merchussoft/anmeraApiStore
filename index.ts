import app from './src/server';

app.set('port', process.env.PORT || 3091);

app.listen(app.get('port'), () => console.log(`SERVER RUNNING IN PORT http://localhost:${app.get('port')}`));
