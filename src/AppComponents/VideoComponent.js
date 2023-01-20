import React from 'react';

const VideoComponent = () => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe title="youtubeVideo" className="embed-responsive-item" src="https://www.youtube.com/embed/3bKYhOtjX5o" allowFullScreen></iframe>
    </div>
  )
}

export default VideoComponent;