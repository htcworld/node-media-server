const NodeMediaServer = require('./');
const path = require('path')
const Ffmpeg = require('@ffmpeg-installer/ffmpeg')

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    webroot: './www',
    allow_origin: '*',
    api: true
  },
  https: {
    port: 8443,
    key: './privatekey.pem',
    cert: './certificate.pem',
  },
  relay: {
    ffmpeg: Ffmpeg.path,
    tasks: [
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_1080p',
      },
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_720p',
      },
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_480p',
      },
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://localhost:1935/hls_360p',
      },
    ]
  },
  trans: {
    ffmpeg: Ffmpeg.path,
    tasks: [
      {
        app: 'hls_1080p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '192k', '-ar', 48000],
        vcParams: ['-vf', "'scale=1920:-1'", '-b:v', '5000k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '7500k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      },
      {
        app: 'hls_720p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '128k', '-ar', 48000],
        vcParams: ['-vf', "'scale=1280:-1'", '-b:v', '2800k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '4200k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      },
      {
        app: 'hls_480p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '128k', '-ar', 48000],
        vcParams: ['-vf', "'scale=854:-1'", '-b:v', '1400k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '2100k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      },
      {
        app: 'hls_360p',
        hls: true,
        ac: 'aac',
        acParam: ['-b:a', '96k', '-ar', 48000],
        vcParams: ['-vf', "'scale=480:-1'", '-b:v', '800k', '-preset', 'fast', '-profile:v', 'baseline', '-bufsize', '1200k'],
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
      }
    ]
  },
  auth: {
    api: true,
    api_user: 'admin',
    api_pass: 'admin',
    play: true,
    publish: true,
    secret: 'nodemedia2017privatekey'
  },
};


let nms = new NodeMediaServer(config)
nms.run();

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

