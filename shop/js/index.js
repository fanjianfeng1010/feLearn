let shopRender = (function () {
    let header = document.getElementById('header')
    let listBox = document.getElementById('list')
    let controlList = header.getElementsByTagName('a')
    let productData = null
    let getData = () => {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'json/product.json', false)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText)
            }
        }
        xhr.send(null)
    }

    let bindHTML = () => {
        let str = ``
        for (let i = 0; i < productData.length; i++) {
            // console.log(productData)
            let {
                title,
                price,
                time,
                img,
                hot
            } = productData[i]

            str +=
                `<li data-price="${price}"
            data-time="${time}"
            data-hot="${hot}">
                <a href="javascript:;">
                <img src="${img}" alt="">
                <p>${title}</p>
                <span>￥${price}</span><br/>
            <span>时间：${time}</span><br/>
            <span>热度：${hot}</span>
            </a></li>`
        }
        listBox.innerHTML = str
    }

    let eventHandle = () => {
        let productList = listBox.getElementsByTagName('li')
        Array.prototype.forEach.call(controlList,(curLink,index) => {
            curLink.flag = -1
            curLink.onclick = function () {
                this.flag *= -1
                let ary = ['data-time','data-price','data-hot']
                Array.prototype.sort.call(productList, (a,b) => {
                    let aInn = a.getAttribute(ary[index])
                    let bInn = a.getAttribute(ary[index])
                    if(index === 0) {
                        aInn = a.getAttribute(ary[index].replace(/-/g,''))
                        bInn = b.getAttribute(ary[index].replace(/-/g,''))
                    }
                    return (aInn - bInn) * this.flag
                })

                console.log(productList);

                Array.prototype.forEach.call(productList,(curLi) => {
                    listBox.appendChild(curLi)
                })

            }
        })


    }
    return {
        init() {
            getData()
            bindHTML()
            eventHandle()
        }
    }
})()

shopRender.init()