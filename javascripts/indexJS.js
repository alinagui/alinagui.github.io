/**
 * Created by cg on 16-5-19.
 */
window.onload = function () {
    setSize();
};
function setSize() {
    var maxWidth = window.innerWidth,maxHeight = window.innerHeight;
    document.getElementById('d_content').style.height = maxHeight + maxHeight/6 + 'px';
}
