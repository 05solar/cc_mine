document.querySelectorAll('button').forEach(button => {
    button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>';
    
    // 호버 이벤트 추가
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-4px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});
