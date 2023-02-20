const toStandardTime = (seconds) => {
    seconds = Math.floor(seconds)
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds - hours * 3600) / 60)
    let secondss = seconds - hours * 3600 - minutes * 60
    let standardTime = ''
    if (hours > 0) {
        minutes = minutes >= 10 ? minutes : '0' + minutes
        secondss = secondss >= 10 ? secondss : '0' + secondss
        standardTime = `${hours}:${minutes}:${secondss}`
    } else {
        secondss = secondss >= 10 ? secondss : '0' + secondss
        standardTime = `${minutes}:${secondss}`
    }
    return standardTime
}

const VideoPlayer = () => {
    let isShowPanel = false
    let isShowVideoControllers = false
    const videoPlayer = document.getElementById('video-player')
    const videoControllers = document.querySelector('.video-controllers')
    const videoPanel = document.querySelector('.video-panels')
    const settingsBtn = document.querySelector('.controllers__btn--settings')
    const mainSettings = document.querySelector('.settings-panel')
    const speedSettings = document.querySelector('.speed-settings')
    const qualitySettings = document.querySelector('.quality-settings')
    const openSpeedSettings = document.querySelector('.open-speed-settings')
    const openQualitySettings = document.querySelector('.open-quality-settings')
    const speedBackwardBtn = speedSettings.querySelector('.backward__btn')
    const qualityBackwardBtn = qualitySettings.querySelector('.backward__btn')

    //Xu ly an hien cua cac layer

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        isShowPanel = !isShowPanel
        if (isShowPanel) {
            mainSettings.className = 'settings-panel panel-in'
            speedSettings.className = 'sub-settings-panel speed-settings'
            qualitySettings.className = 'sub-settings-panel quality-settings'
            videoPanel.style.display = 'block'
            return
        }
        videoPanel.style.display = 'none'
    })

    videoPlayer.addEventListener('click', () => {
        if (isShowPanel) {
            isShowPanel = false
            isShowVideoControllers = true
            videoPanel.style.display = 'none'
        }
    })

    videoPlayer.addEventListener('blur', () => {
        if (isShowPanel) {
            isShowPanel = false
            isShowVideoControllers = false
            if (!isShowVideoControllers && !isShowPanel) {
                videoControllers.classList.add('hide')
            }
            videoPanel.style.display = 'none'
        }
    })

    openSpeedSettings.addEventListener('click', (e) => {
        e.stopPropagation()
        mainSettings.classList.toggle('panel-in')
        speedSettings.classList.toggle('panel-in')
    })

    openQualitySettings.addEventListener('click', (e) => {
        e.stopPropagation()
        mainSettings.classList.toggle('panel-in')
        qualitySettings.classList.toggle('panel-in')
    })

    speedBackwardBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        speedSettings.classList.toggle('panel-in')
        mainSettings.classList.toggle('panel-in')
    })

    qualityBackwardBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        qualitySettings.classList.toggle('panel-in')
        mainSettings.classList.toggle('panel-in')
    })


    videoPlayer.addEventListener('mouseover', () => {
        isShowVideoControllers = true
        if (isShowVideoControllers) {
            videoControllers.classList.remove('hide')
        }
    })

    videoPlayer.addEventListener('mouseout', () => {
        isShowVideoControllers = false
        if (!isShowVideoControllers && !isShowPanel) {
            videoControllers.classList.add('hide')
        }
    })

    //Xu ly chuc nang

    //Ngan chan noi bot
    videoControllers.addEventListener('click', e => {
        e.stopPropagation()
        if (isShowPanel) {
            isShowPanel = false
            isShowVideoControllers = true
            videoPanel.style.display = 'none'
        }
    })

    //Full Screen Function
    let isFullScreen = false
    const expandBtn = document.querySelector('.controllers__btn--expand')
    expandBtn.addEventListener('click', () => {
        isFullScreen = !isFullScreen
        if (isFullScreen) {
            videoPlayer.style.position = 'fixed'
            videoPlayer.style.top = '0'
            videoPlayer.style.left = '0'
            videoPlayer.style.width = '100%'
            videoPlayer.style.height = '100%'
            return
        }
        videoPlayer.style = {
            width: '100%',
            height: '100%',
            'background-color': 'purple',
            position: 'relative',
            overflow: 'hidden'
        }
    })


    //Play Pause Function

    let isPlay = false;
    const controllersPlayPauseBtn = document.querySelector('.controllers__btn--play-pause i')
    const videoContainerStream = document.querySelector('.video-container__stream')

    const PlayPauseVideo = () => {
        isPlay = !isPlay
        if (isPlay) {
            controllersPlayPauseBtn.className = 'fa-solid fa-pause'
            videoContainerStream.play()
            return
        }
        controllersPlayPauseBtn.className = 'fa-solid fa-play'
        videoContainerStream.pause()
    }

    //play by btn
    controllersPlayPauseBtn.addEventListener('click', () => {
        PlayPauseVideo()
    })

    //play by space keydown
    videoPlayer.addEventListener('keydown', (e) => {
        if (e.keyCode === 32) {
            PlayPauseVideo()
        }
    })

    //play by click on video
    videoPlayer.addEventListener('click', (e) => {
        const overlayPlay =
            `
        <div class="overlay-after__play-pause">
            <i class="fa-solid fa-play"></i>
        </div>
        `

        const overlayPause =
            `
        <div class="overlay-after__play-pause">
            <i class="fa-solid fa-pause"></i>
        </div>
        `
        const overlayAfter = document.querySelector('.overlay-after')
        if (!isPlay) {
            overlayAfter.innerHTML = overlayPlay
            setTimeout(() => {
                overlayAfter.innerHTML = ''
            }, 700);
        } else {
            overlayAfter.innerHTML = overlayPause
            setTimeout(() => {
                overlayAfter.innerHTML = ''
            }, 700);
        }
        PlayPauseVideo()
    })

    //Handle Volume function
    let isMuted = false
    const controllersBtnVolRange = document.querySelector('.controllers__btn--vol-range input')
    const controllersBtnVolume = document.querySelector('.controllers__btn--volume i')

    //Change Volume 
    controllersBtnVolRange.addEventListener('change', () => {
        if (controllersBtnVolRange.value == 0) {
            controllersBtnVolume.className = 'fa-solid fa-volume-xmark'
            videoContainerStream.muted = true
            isMuted = true
        } else {
            videoContainerStream.volume = controllersBtnVolRange.value / 100
            controllersBtnVolume.className = 'fa-solid fa-volume'
        }
    })

    //Mute 
    controllersBtnVolume.addEventListener('click', () => {
        isMuted = !isMuted
        if (isMuted) {
            controllersBtnVolume.className = 'fa-solid fa-volume-xmark'
            videoContainerStream.muted = true
            controllersBtnVolRange.value = 0
            return
        }
        controllersBtnVolume.className = 'fa-solid fa-volume'
        videoContainerStream.muted = false
        controllersBtnVolRange.value = videoContainerStream.volume * 100
    })

    //Xu ly video chay roi update ra view
    const timeControllerRange = document.querySelector('.time-controller__range')
    const videoTimer = document.querySelector('.controllers__btn--timer .video-time')
    function updateTimeToRange() {
        timeControllerRange.value = (videoContainerStream.currentTime / videoContainerStream.duration) * 100
        rangeThumb.style.width = `calc(${timeControllerRange.value}%)`
        const curTime = videoTimer.querySelector('span:nth-child(1)')
        const duration = videoTimer.querySelector('span:nth-child(2)')
        curTime.textContent = toStandardTime(videoContainerStream.currentTime)
        duration.textContent = toStandardTime(videoContainerStream.duration)
    }
    videoContainerStream.addEventListener('timeupdate', updateTimeToRange)

    //Xu ly preload video
    const timeControllerPreload = document.querySelector('.time-controller__preload')
    videoContainerStream.addEventListener('progress', () => {
        let bufferedLength = videoContainerStream.buffered.length - 1
        const percent = (videoContainerStream.buffered.end(bufferedLength) / videoContainerStream.duration) * 100;
        timeControllerPreload.style.width = percent + '%'
    })

    //Xu ly tua video

    //Tua video bang click
    const rangeThumb = document.querySelector('.range-thumb')

    timeControllerRange.addEventListener('click', e => {
        let percents = (e.offsetX / e.target.offsetWidth) * 100
        let newTime = videoContainerStream.duration * percents / 100
        videoContainerStream.currentTime = newTime
    })

    rangeThumb.addEventListener('mousedown', e => {
        let percents = (e.offsetX / timeControllerRange.offsetWidth) * 100
        let newTime = videoContainerStream.duration * percents / 100
        videoContainerStream.currentTime = newTime
    })


    //Tua video bang an phim
    videoPlayer.addEventListener('keydown', (e) => {
        if (e.keyCode === 39) {
            videoContainerStream.currentTime += 5
        } else if (e.keyCode === 37) {
            videoContainerStream.currentTime -= 5
        }
    })

    //Xu ly settings function

    //Playback Speed
    const speedOptions = Array.from(document.querySelectorAll('.speed-settings .sub-settings-panel__options'))
    speedOptions.forEach(option => {
        option.addEventListener('click', e => {
            e.stopPropagation()
            videoContainerStream.playbackRate = option.getAttribute('rate')
            speedSettings.classList.toggle('panel-in')
            mainSettings.classList.toggle('panel-in')
            let curRate = mainSettings.querySelector('.open-speed-settings .option--right')
            curRate.textContent = (option.getAttribute('rate') === '1' ? 'Normal' : option.getAttribute('rate')) + ' >'
        })
    })

    //Xu ly size Preview Video
    const videoContainerPreview = document.querySelector('.video-container__preview')
    videoContainerPreview.width = videoContainerPreview.videoWidth / 15
    videoContainerPreview.height = videoContainerPreview.videoHeight / 15

    //Preview Video To Preview Layer
    const canvas = document.querySelector('.video-preview-layer__image')
    const context = canvas.getContext('2d');

    //Xu ly preview layer di chuyen theo chuot
    const timeController = document.querySelector('.time-controller')
    const videoPreviewLayer = document.querySelector('.video-preview-layer')
    timeController.addEventListener('mousemove', e => {
        videoPreviewLayer.style.display = 'block'
        if (e.offsetX - 10 < videoPreviewLayer.offsetWidth / 2) {
            videoPreviewLayer.style.left = '10px'
        } else if (timeController.offsetWidth - e.offsetX < videoPreviewLayer.offsetWidth / 2) {
            videoPreviewLayer.style.left = 10 + timeController.offsetWidth - videoPreviewLayer.offsetWidth + 'px'
        } else {
            videoPreviewLayer.style.left = 10 + e.offsetX - videoPreviewLayer.offsetWidth / 2 + 'px'
        }
        let percent = (e.offsetX / timeController.offsetWidth)
        let previewTime = percent * videoContainerPreview.duration
        videoContainerPreview.currentTime = previewTime
    })

    timeController.addEventListener('mouseout', e => {
        videoPreviewLayer.style.display = 'none'
    })

    videoContainerPreview.addEventListener('seeked', () => {
        canvas.width = videoContainerPreview.width
        canvas.height = videoContainerPreview.height
        context.drawImage(videoContainerPreview, 0, 0, videoContainerPreview.width, videoContainerPreview.height);
    })

    //Xy ly end video
    videoContainerStream.addEventListener('ended', () => {
        isPlay = false
        let playAgainLayer = document.createElement('div')
        playAgainLayer.className = 'playAgainLayer'
        playAgainLayer.innerHTML =
            `
        <div class="playAgainLayer__replay">
            <i class="fa-solid fa-rotate-right"></i>
        </div>
        `
        videoPlayer.appendChild(playAgainLayer)

        playAgainLayer.addEventListener('mouseover', (e) => {
            e.stopPropagation()
        })

        playAgainLayer.addEventListener('click', (e) => {
            e.stopPropagation()
        })

        videoPlayer.addEventListener('mouseout', (e) => {
            e.stopPropagation()
        })

        const playAgainBtn = document.querySelector('.playAgainLayer__replay')
        playAgainBtn.addEventListener('click', () => {
            playAgainLayer.remove()
            videoContainerStream.currentTime = 0
            PlayPauseVideo()
        })

    })
}

const videoStarter = document.querySelector('.overlay-before__play')
const overlayBefore = document.querySelector('.overlay-before')
videoStarter.addEventListener('click', () => {
    overlayBefore.remove()
    VideoPlayer()
})