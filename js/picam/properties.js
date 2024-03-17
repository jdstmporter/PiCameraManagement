export {PiCamSettings};

const PiCamSettings = {
//    rpiCameraCamID: ['int', 0, 256],
    rpiCameraWidth: ['int', [0, 65536], 'screen width in pixels'],
    rpiCameraHeight: ['int', [0, 65536], 'screen height in pixels'],
    rpiCameraHFlip: ['bool', 'horizontally flip image'],
    rpiCameraVFlip: ['bool', 'vertically flip image'],
    rpiCameraBrightness: ['number', [-1.0, 1.0], 'image brightness'],
    rpiCameraContrast: ['int', [0, 16], 'image contrast'],
    rpiCameraSaturation: ['int', [0, 16], 'image saturation'],
    rpiCameraSharpness: ['int', [0, 16], 'image sharpness'],
    rpiCameraExposure: ['choose', ['normal', 'short', 'long', 'custom'], 'image exposure'],
    rpiCameraAWB: ['choose', ['auto', 'incandescent', 'tungsten', 'flourescent', 'indoor', 'daylight', 'cloudy', 'custom'], 'lighting model'],
    rpiCameraDenoise: ['choose', ['off', 'cdn_off', 'cdn_fast', 'cdn_hq'], 'noise correction'],
    rpiCameraShutter: ['int', [0, 1048576], 'camera shutter speed'],
    //   rpiCameraMetering: ['choose',['centre','spot','matrix','custom']],
//    rpiCameraGain: ['number',-16.90,16.0],
//    rpiCameraEV: ['number',-10.0,10.0],
    rpiCameraAfMode: ['choose', ['auto', 'manual', 'continuous'], 'autofocus mode'],
    rpiCameraAfRange: ['choose', ['normal', 'macro', 'full'], 'autofocus range'],
    rpiCameraAfSpeed: ['choose', ['normal', 'fast'], 'autofocus speed'],
    rpiCameraLensPosition: ['number', [0.0, 256.0], 'lens position (1 / distance to object)']
};
