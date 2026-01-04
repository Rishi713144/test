import { useEffect } from "react";

export const Receiver = () => {
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8127");
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "receiver" }));
        };
        startReceiving(socket);
    }, []);

    function startReceiving(socket: WebSocket) {
        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;       
        video.playsInline = true;
        document.body.appendChild(video);

        const pc = new RTCPeerConnection();

        pc.ontrack = (event) => {
            console.log("Track received");
            video.srcObject = event.streams[0];
        };

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "createOffer") {
                await pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket.send(
                    JSON.stringify({
                        type: "createAnswer",
                        sdp: pc.localDescription,
                    })
                );
            } else if (message.type === "iceCandidate") {
                await pc.addIceCandidate(message.candidate);
            }
        };
    }

    return <div>Receiver</div>;
};
