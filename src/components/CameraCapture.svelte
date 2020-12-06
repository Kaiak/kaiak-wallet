<script lang="ts">
    import {ImageCapture} from 'image-capture'
    import {onDestroy, onMount} from "svelte";
    import Button from "./Button.svelte";
    import jsQR, {QRCode} from "jsqr";
    import type {NanoAddress} from "../machinery/models";
    import {tools} from "nanocurrency-web";
    import {softwareKeysStore} from "../stores/stores";

    export let scannedAddress: (address: NanoAddress) => void

    let videoPreview: MediaStream | undefined
    let showVideo: boolean = true

    const startRecording = async () => {
        showVideo = true
        videoPreview = await navigator.mediaDevices.getUserMedia({video: true})
        const video: HTMLVideoElement = document.querySelector('#video');
        video.srcObject = videoPreview
        await video.play()
        softwareKeysStore.set({
            middleKey: {
                onClick: () => captureCameraImage(),
                languageId: "softkey-capture-camera"
            },
        })
    }

    const stopRecording = () => {
        const tracks: MediaStreamTrack[] | undefined = videoPreview.getVideoTracks()
        tracks.forEach(track => {
            track.stop()
        })
        softwareKeysStore.set({
            middleKey: undefined
        })
    }

    const captureCameraImage = async () => {
        try {
            showVideo = false;
            const track = videoPreview.getVideoTracks()[0];
            let imageCapture = new ImageCapture(track);
            const frame = await imageCapture.grabFrame();
            const canvas: HTMLCanvasElement = document.querySelector('#canvas');

            // set canvas dimensions to video ones to not truncate picture
            canvas.width = frame.width;
            canvas.height = frame.height;

            // copy full video frame into the canvas
            let context = canvas.getContext('2d');
            context.drawImage(frame, 0, 0, frame.width, frame.height);
            const imageData: ImageData = context.getImageData(0, 0, frame.width, frame.height)
            await decodeImage(imageData)
            track.stop();
        } catch (e) {
            console.log(e)
        }
    }

    const decodeImage = async (imageData) => {
        try {
            const code: QRCode | null = jsQR(imageData.data, imageData.width, imageData.height);
            if (code && tools.validateAddress(code.data)) {
                stopRecording();
                scannedAddress(code.data)
            } else {
                await startRecording();
            }
        } catch (e) {
            console.log(e)
        }
    }

    onMount(async () => {
        await startRecording()
    })

    onDestroy(() => {
        stopRecording();
    })
</script>

<style>
    .video-el {
        width: 100%;
        height: auto;
    }
</style>
<canvas id="canvas" height={0} width={0} hidden={showVideo} class="video-el"/>
<video id="video" autoplay hidden={!showVideo} class="video-el"/>
