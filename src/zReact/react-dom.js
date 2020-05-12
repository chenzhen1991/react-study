import {TEXT} from './const'
function render(vnode, container){
    // vnode --> node
    // container.appendChild(node)
    const node = createNode(vnode, container)
    container.appendChild(node)
    // console.log('vnode', vnode)
}

// vnode - node
// 生成node
function createNode(vnode, parentNode) {
    const {type, props} = vnode
    let node = null;
    // console.log('type', type)
    if(type === TEXT) {
        node = document.createTextNode(props.nodeValue)
    } else if(typeof type === 'string'){
        node = document.createElement(type)
    } else if(typeof type === 'function'){
        // console.log('type', type)
        // function 的写法
        // node = type.prototype.isReactComponent ? updateClassComponent(vnode, parentNode): updateRenderComponent(vnode, parentNode)
        node = type.isReactComponent ? updateClassComponent(vnode, parentNode): updateRenderComponent(vnode, parentNode)
    } else if(type === undefined){
        node = document.createDocumentFragment()
    }
    reconcileChildren(props.children, node)
    updateNode(node, props)
    // console.log(node)
    return node
}

function reconcileChildren(children, node){
    for(let i = 0; i< children.length; i++) {
        const child = children[i]
        if(Array.isArray(child)){
            for(let j = 0; j < child.length; j++){
                render(child[j], node)
            }
        } else {
            render(child, node)
        }
    }
}

function updateNode(node, nextVal){
    Object.keys(nextVal)
        .filter(k => k !== 'children')
        .forEach(k =>{
            if(k.slice(0, 2) === 'on'){
                const eventName = k.slice(2).toLocaleLowerCase();
                node.addEventListener(eventName,nextVal[k])
            }else {
                node[k] = nextVal[k]
            }
    })
}

function updateRenderComponent(vnode, parentNode) {
    const {type, props} = vnode
    const vvnode = type(props)
    const node = createNode(vvnode, parentNode)
    return node;
}

function updateClassComponent(vnode, parentNode){
    const {type, props} = vnode;
    console.log(type)
    const comp = new type(props);
    const vvnode = comp.render();
    const node = createNode(vvnode, parentNode)
    return node;
}

export default {render}