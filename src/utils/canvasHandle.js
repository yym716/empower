/**
 * @description 计算图片缩放值，图片和给定的宽高进行比较获得缩放的比例值scale
 * @param width 与图片比较的宽度
 * @param height  与图片比较的高度
 * @param imgWidth 图片宽度
 * @param imgHeight 图片高度
 * @returns numbers
 */
export function countScale(width, height, imgWidth, imgHeight) {
    let scale = 1;
    //图片宽高小于canvas的宽高，图像比例直接赋值1
    if (width > imgWidth && height > imgHeight) {
        scale = 1;
        //小于，就将图片放大充满canvas
        // let xScale = width / imgWidth;
        // let yScale = height / imgHeight;

        // if (xScale >= yScale) {
        //     scale = yScale;
        // } else if (xScale < yScale) {
        //     scale = xScale;
        // }
    }
    //图片宽度大于canvas宽度,高度小于canvas高度
    else if (width < imgWidth && height > imgHeight) {
        scale = width / imgWidth;
    }
    //图片宽度小于canvas宽度,高度大于canvas高度
    else if (width > imgWidth && height < imgHeight) {
        scale = height / imgHeight;
    }
    //图片宽高大于canvas的宽高
    else if (width < imgWidth && height < imgHeight) {
        //先拿高度的和canvas高度一样的图片比例
        let new_scale = height / imgHeight;
        let new_width = imgWidth * new_scale;
        //再比较缩小后的宽度
        if (width > new_width) {
            //canvas大于则用此比例
            scale = new_scale;
        } else {
            //canvas小于则用宽度一样的比例
            scale = width / imgWidth;
        }
    }
    return scale;
}

/**
 * @description 获取鼠标点击在canvas上的点，距离canvas原点的x,y距离
 * @param x x坐标
 * @param y y坐标
 * @param canvas 点击的canvas
 */
export function windowToCanvas(x, y, canvas) {
    //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
    let box = canvas.getBoundingClientRect();
    return {
        x: x - box.left - (box.width - canvas.width) / 2,
        y: y - box.top - (box.height - canvas.height) / 2,
    };
}