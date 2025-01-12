import { useCanvas } from "../hooks/useCanvas";

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1; // 작은 원들
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = '#FFFFFF'; // 흰색 원들만 남김
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.speedX;
        this.y += this.speedY;

        // 경계에서 튕겨 나오도록
        if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
    }
}

// 유성 클래스
class Meteor {
    constructor(canvasWidth) {
        this.x = Math.random() * canvasWidth; // 랜덤한 x 좌표
        this.y = -Math.random() * 100; // 화면 위쪽에서 떨어지기 시작
        this.size = Math.random() * 3 + 5; // 크기 랜덤
        this.speedX = (Math.random() - 0.5) * 2; // x 방향 속도
        this.speedY = Math.random() * 5 + 3; // y 방향 속도
        this.color = 'rgba(255, 255, 255, 0.8)'; // 유성 색상
        this.tailLength = Math.random() * 30 + 10; // 유성 꼬리 길이
        this.tailOpacity = 0.2; // 꼬리 투명도
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();

        // 유성 꼬리 그리기
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.tailOpacity})`;
        ctx.lineWidth = this.size / 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * this.tailLength, this.y - this.speedY * this.tailLength);
        ctx.stroke();
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.speedX;
        this.y += this.speedY;

        // 화면 밖으로 나가지 않도록
        if (this.y > canvasHeight) {
            this.reset(canvasWidth);
        }
    }

    reset(canvasWidth) {
        this.x = Math.random() * canvasWidth;
        this.y = -Math.random() * 100; // 화면 위쪽에서 떨어지기 시작
        this.size = Math.random() * 3 + 5;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = Math.random() * 5 + 3;
        this.tailOpacity = Math.random() * 0.3 + 0.2; // 꼬리의 투명도를 매번 다르게
    }
}

export function BounceBall(props) {
    const fillBackground = (ctx, time) => {
        // 그라데이션을 사용하여 배경 색상 변화를 설정
        const gradient = ctx.createLinearGradient(0, 0, 0, props.canvasHeight);
        gradient.addColorStop(0, '#1D8352'); // 테마 색상 (처음 색상)
        gradient.addColorStop(1, `rgb(${Math.sin(time) * 128 + 128}, ${Math.cos(time) * 128 + 128}, 80)`); // 부드럽게 변화하는 색상
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);
    }

    // 흰색 작은 원들을 위한 파티클
    const particles = Array.from({ length: 100 }, () => new Particle(props.canvasWidth, props.canvasHeight));

    // 파도 모양 애니메이션 (여러 개의 서로 다른 파장, 주기)
    let waveOffsets = [0, Math.PI / 2, Math.PI, Math.PI / 4];
    const waves = [
        { amplitude: 30, frequency: 0.02, speed: 0.05 },  // 첫 번째 파도
        { amplitude: 50, frequency: 0.01, speed: 0.04 },  // 두 번째 파도
        { amplitude: 20, frequency: 0.03, speed: 0.06 },  // 세 번째 파도
        { amplitude: 40, frequency: 0.025, speed: 0.03 }, // 네 번째 파도
    ];

    const drawWave = (ctx, wave, offset) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; // 흐릿한 흰색
        ctx.beginPath();
        for (let x = 0; x < props.canvasWidth; x++) {
            const y = Math.sin(x * wave.frequency + offset) * wave.amplitude + props.canvasHeight * 0.85; // 화면 하단 15% 부분에만 웨이브 그리기
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.lineTo(props.canvasWidth, props.canvasHeight);
        ctx.lineTo(0, props.canvasHeight);
        ctx.fill();
    }

    // 유성 객체 배열
    const meteors = Array.from({ length: 5 }, () => new Meteor(props.canvasWidth));

    const animate = (ctx) => {
        const time = Date.now() * 0.0001; // 시간 기반으로 배경 색상 변화 계산
        ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);

        // 배경 색상 그라데이션
        fillBackground(ctx, time);

        // 여러 개의 파도 애니메이션 (화면 하단에서만 파도 그리기)
        waves.forEach((wave, index) => {
            drawWave(ctx, wave, waveOffsets[index]);
            waveOffsets[index] += wave.speed; // 파도 애니메이션 속도 조절
        });


        // 유성 애니메이션
        meteors.forEach((meteor) => {
            meteor.update(props.canvasWidth, props.canvasHeight);
            meteor.draw(ctx);
        });

        // 흰색 원들 애니메이션
        particles.forEach((particle) => {
            particle.update(props.canvasWidth, props.canvasHeight);
            particle.draw(ctx);
        });
    }

    const canvasRef = useCanvas(props.canvasWidth, props.canvasHeight, animate);

    return (
        <canvas ref={canvasRef} />
    )
}