

import React, { useEffect } from 'react';
import Quagga from 'quagga';

export function QrCodeScanner({ onScan }) {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // Use the rear camera
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['ean_reader', 'qrcode_reader'], // Configure the readers you need
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error('Error initializing Quagga:', err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      if (result && result.codeResult && result.codeResult.code) {
        const scannedData = result.codeResult.code;
        onScan(scannedData);
        {console.log('qr code: ', scannedData)}
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onScan]);

  return (
    <div id="qr-code-scanner">
      <h2>QR Code Scanner</h2>
      <div id="interactive" className="viewport" />
      {console.log('qr code: ', )}
    </div>
  );
}


