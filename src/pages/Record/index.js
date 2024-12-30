import React, { Component } from 'react';
import RecordRTC from 'recordrtc';

class Record extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.recordRTC = null;

    this.state = {
      recording: false,
      videoBlob: null,
    };
  }

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.videoRef.current.srcObject = stream; // Gắn stream vào video element
        this.recordRTC = RecordRTC(stream, { type: 'video' });
      })
      .catch((error) => {
        console.error('Không thể truy cập camera và microphone:', error);
      });
  }

  startRecording = () => {
    if (this.recordRTC) {
      this.recordRTC.startRecording();
      this.setState({ recording: true });
    }
  };

  stopRecording = () => {
    if (this.recordRTC) {
      this.recordRTC.stopRecording(() => {
        const videoBlob = this.recordRTC.getBlob();
        this.setState({ recording: false, videoBlob });
      });
    }
  };

  downloadVideo = () => {
    const { videoBlob } = this.state;
    if (videoBlob) {
      const url = window.URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'recorded-video.webm';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  render() {
    const { recording } = this.state;

    return (
      <div>
        <video ref={this.videoRef} autoPlay muted />
        {recording ? (
          <button onClick={this.stopRecording}>Dừng ghi âm</button>
        ) : (
          <button onClick={this.startRecording}>Bắt đầu ghi âm</button>
        )}
        <button onClick={this.downloadVideo}>Tải xuống video</button>
      </div>
    );
  }
}

export default Record;
