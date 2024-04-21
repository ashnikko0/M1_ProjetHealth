function ScrollUp() {

    function topFunction() {
        window.scrollTo(0, 0);
    }

    return <button className="scroll-up" onClick={topFunction}>Top</button>;
}

export default ScrollUp;