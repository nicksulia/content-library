"use strict";
var ffmpeg = require("fluent-ffmpeg");
const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer);
const SocketIOFile = require('socket.io-file');
const video_streamer = require('./video_streamer');
const stream_audio = require('./stream_audio');
const config = require('./config.js');

const db =  require('./utils/DataBaseUtils');
const bodyParser = require('body-parser');
const cors = require('cors');
var meta = {};
// Set up connection of database
db.setUpConnection();

app.get('/', (req, res, next) => {
	return res.sendFile(__dirname + '/client/app/index.html');
});

app.get('/css/:fileName',(req, res, next) => {
    return res.sendFile(__dirname + '/client/app/css/'+req.params.fileName);
});
app.get('/js/:fileName',(req, res, next) => {
    return res.sendFile(__dirname + '/client/app/js/'+req.params.fileName);
});
app.get('/data/image/:fileName', (req, res, next) => {
    return res.sendFile(__dirname + '/data/image/'+req.params.fileName);
});
app.get('/data/text/:fileName', (req, res, next) => {
    return res.sendFile(__dirname + '/data/text/'+req.params.fileName);
});
app.get('/data/music/:fileName',stream_audio.streamAudio);
app.get('/data/video/:fileName', video_streamer.streamMovie);

app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/content', (req, res) => {
    db.contentList().then(data => res.send(data));
});

app.post('/content', (req, res) => {
	meta = req.body;
	res.send('added');
    //db.createContent(req.body).then(data => res.send(data));
});

app.delete('/content/:id', (req, res) => {
    db.deleteContent(req.params.id).then(data => res.send(data));
});

io.on('connection', (socket) => {
	console.log('Socket connected.');

	var count = 0;
	var uploader = new SocketIOFile(socket, {
		uploadDir: {			// multiple directories
			music: 'data/music',
			video: 'data/video',
			text:'data/text'
		},
		//uploadDir: 'data',							// simple directory
		accepts: ['audio/mpeg', 'audio/mp3','audio/mp4','video/mp4','video/mpeg','application/pdf'],		// chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
		// maxFileSize: 4194304, 						// 4 MB. default is undefined(no limit)
		chunkSize: 10240,							// default is 10240(1KB)
		transmissionDelay: 0,						// delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
		overwrite: false, 							// overwrite file if exists, default is true.
		// rename: function(filename) {
		// 	var split = filename.split('.');	// split filename by .(extension)
		// 	var fname = split[0];	// filename without extension
		// 	var ext = split[1];

		// 	return `${fname}_${count++}.${ext}`;
		// }
	});
	uploader.on('start', (fileInfo) => {
		console.log('Start uploading');
		console.log(fileInfo);
	});
	uploader.on('stream', (fileInfo) => {
		console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
	});
	uploader.on('complete', (fileInfo) => {

		var dir = fileInfo.uploadDir.split('\\');
		var name = dir[2].split('.');
		name.pop();
		name.join(".");
		console.log(dir+" || "+ name);
        // new ffmpeg({ source: dir[0]+"/"+dir[1]+"/"+dir[2] })
        //     .withVideoCodec('libtheora')
        //     .addOptions(['-qmin 0', '-qmax 50', '-crf 5'])
        //     .withVideoBitrate(133)
        //     .withAudioCodec('libvorbis')
        //     .on('start', function(commandLine) {
        //         console.log('Spawned FFmpeg with command: ' + commandLine);
        //     })
        //     .on('codecData', function(data) {
        //         console.log('Input is ' + data.audio + ' audio with ' + data.video + ' video');
        //     })
        //     .on('error', function(err) {
        //         console.log('Cannot process video: ' + err.message);
        //     })
        //     .saveToFile(dir[0]+"/"+dir[1]+"/"+name+".ogv")
        //     .on('end', function() {
        //         console.log('Processing finished successfully');
        //     });
		if(meta.contentType === 'video'){
            new ffmpeg(dir[0]+"/"+dir[1]+"/"+dir[2])
                .on('end', function(files) {
                    meta.resources = [dir[0]+"/"+dir[1]+"/"+dir[2]];
                    meta.poster = `data/image/${name}_poster.png`;
                    console.log(meta);
                    db.createContent(meta);
                    meta = {};
                    console.log('screenshots were saved as ' + files);
                })
                .on('error', function(err) {
                    console.log('an error happened: ' + err.message);
                })
                .screenshots({
                    timestamps: [0],
                    filename: name+'_poster.png',
                    folder: './data/image'
                });
		}else if(meta.contentType === 'audio') {
            meta.resources = [dir[0]+"/"+dir[1]+"/"+dir[2]];
            meta.poster = `data/image/default-audio-poster.png`;
            db.createContent(meta);
            meta = {};
		} else if(meta.contentType === 'text') {
            meta.resources = [dir[0]+"/"+dir[1]+"/"+dir[2]];
            meta.poster = `data/image/default-text-poster.png`;
            db.createContent(meta);
            meta = {};
		}
	});
	uploader.on('error', (err) => {
		console.log('Error!', err);
	});
	uploader.on('abort', (fileInfo) => {
		console.log('Aborted: ', fileInfo);
	});

});



httpServer.listen(config.serverPort,config.host, () => {
	console.log('Server listening on port 3000');
});