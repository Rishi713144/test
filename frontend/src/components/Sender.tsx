import { useEffect, useRef, useState } from "react";

export const Sender = () => {
    const socketRef = useRef<WebSocket | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8127");
        socketRef.current = socket;

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "sender" }));
        };

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            const pc = pcRef.current;
            if (!pc) return;

            if (message.type === "createAnswer") {
                await pc.setRemoteDescription(message.sdp);
            } else if (message.type === "iceCandidate") {
                await pc.addIceCandidate(message.candidate);
            }
        };
    }, []);

    const initiateConn = async () => {
        if (!socketRef.current) {
            alert("Socket not ready");
            return;
        }

        const pc = new RTCPeerConnection();
        pcRef.current = pc;

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current?.send(
                    JSON.stringify({
                        type: "iceCandidate",
                        candidate: event.candidate,
                    })
                );
            }
        };

        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socketRef.current?.send(
                JSON.stringify({
                    type: "createOffer",
                    sdp: pc.localDescription,
                })
            );
        };

        await getCameraStreamAndSend(pc);
    };

    const getCameraStreamAndSend = async (pc: RTCPeerConnection) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            const video = document.createElement("video");
            video.srcObject = stream;
            video.autoplay = true;
            video.muted = true;
            document.body.appendChild(video);

            stream.getTracks().forEach(track => {
                pc.addTrack(track, stream);
            });

        } catch (err) {
            console.error("getUserMedia failed:", err);
            alert("Camera not available");
        }
    };

    return (
        <div>
            Sender
            <button onClick={initiateConn}>Send data</button>
        </div>
    );
};
