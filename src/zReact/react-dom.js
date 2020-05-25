// import {TEXT} from './const'
// 一开始的实现方法 没有用fiber
// function render(vnode, container){
//     // vnode --> node
//     // container.appendChild(node)
//     const node = createNode(vnode, container)
//     container.appendChild(node)
//     // console.log('vnode', vnode)
// }


// vnode - node
// 生成node
// function createNode(vnode, parentNode) {
//     const {type, props} = vnode
//     let node = null;
//     // console.log('type', type)
//     if(type === TEXT) {
//         node = document.createTextNode(props.nodeValue)
//     } else if(typeof type === 'string'){
//         node = document.createElement(type)
//     } else if(typeof type === 'function'){
//         // console.log('type', type)
//         // function 的写法
//         // node = type.prototype.isReactComponent ? updateClassComponent(vnode, parentNode): updateRenderComponent(vnode, parentNode)
//         node = type.isReactComponent ? updateClassComponent(vnode, parentNode): updateRenderComponent(vnode, parentNode)
//     } else if(type === undefined){
//         node = document.createDocumentFragment()
//     }
//     reconcileChildren(props.children, node)
//     updateNode(node, props)
//     // console.log(node)
//     return node
// }
//
// function reconcileChildren(children, node){
//     for(let i = 0; i< children.length; i++) {
//         const child = children[i]
//         if(Array.isArray(child)){
//             for(let j = 0; j < child.length; j++){
//                 render(child[j], node)
//             }
//         } else {
//             render(child, node)
//         }
//     }
// }
//
// function updateNode(node, nextVal){
//     Object.keys(nextVal)
//         .filter(k => k !== 'children')
//         .forEach(k =>{
//             if(k.slice(0, 2) === 'on'){
//                 const eventName = k.slice(2).toLocaleLowerCase();
//                 node.addEventListener(eventName,nextVal[k])
//             }else {
//                 node[k] = nextVal[k]
//             }
//     })
// }
//
// function updateRenderComponent(vnode, parentNode) {
//     const {type, props} = vnode
//     const vvnode = type(props)
//     const node = createNode(vvnode, parentNode)
//     return node;
// }
//
// function updateClassComponent(vnode, parentNode){
//     const {type, props} = vnode;
//     console.log(type)
//     const comp = new type(props);
//     const vvnode = comp.render();
//     const node = createNode(vvnode, parentNode)
//     return node;
// }

// 改为用fiber实现代码
import {TEXT, PLACEMENT, UPDATE, DELETIONS} from './const'
let nextUnitOfWork = null;

//  work in progress fiber root
let wipRoot = null;

//  当前的根root  fiber root
let currentRoot = null
let deletions = null
//  fiber 结构
//  1，child 2，sibling  3，return ,4node  dom节点 5,base存储当前节点的上一次的fiber
function render(vnode, container){
    wipRoot ={
        node: container,
        props:{
            children:[vnode]
        },
        base: currentRoot
    }
    // console.log(wipRoot)
    deletions = []
    nextUnitOfWork = wipRoot
}

function createNode(fiber){
    const {type, props} = fiber;
    let node = null;
    if(type === TEXT){
        node = document.createTextNode('')
    } else if(typeof  type === 'string'){
        node = document.createElement(type)
    }
    // else{
    //     node = document.createDocumentFragment()
    // }

    updateNode(node, {}, props)

    return node;
}

function updateNode(node, preVal, nextVal){
    //  旧的 className: 'red'
    //  新的 style:{{color: 'pink'}}
    Object.keys(preVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 简单处理 on开头当做事件
        let eventName = k.slice(2).toLowerCase();
        node.removeEventListener(eventName, preVal[k]);
      } else {
        // 简单处理，如果需要考虑的style的话，需要再做处理，清空对象
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });
    Object.keys(nextVal)
        .filter(k => k !== 'children')
        .forEach(k => {
            if(k.slice(0,2) === 'on') {
                let eventName = k.slice(2).toLocaleLowerCase()
                node.addEventListener(eventName, nextVal[k])
            }else{
                // 简单处理 如果需要考虑的style的话 需要在做处理 清空对象
                node[k] = nextVal[k];
            }
        })
}

function placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects) {
    //标识了在当前父节点中的位置下标
    newFiber.index = newIdx;
    if(!shouldTrackSideEffects){
        return lastPlacedIndex
    }
    let base = newFiber.base;
    let oldIndex = base.index
    if(oldIndex < lastPlacedIndex){
        return lastPlacedIndex
    } else {
        return oldIndex
    }
}

function reconcileChildren(workInProgressFiber, newChildren){
    let previousNewFiber = null;
    let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
    let shouldTrackSideEffects = true;
    if(!oldFiber){
        // 代表初次渲染
        shouldTrackSideEffects = false
    }
    let lastPlacedIndex = 0;
    let newIdx = 0;
    let nextOldFiber = null;

    for(;oldFiber !== null && newIdx< newChildren.length; newIdx++){
        let newChild = newChildren[newIdx];
        if(oldFiber.index > newIdx){
            nextOldFiber = oldFiber
            oldFiber = null
        } else {
            nextOldFiber = oldFiber.sibling
        }
        if(newChild.type !== oldFiber.type || newChild.key !== oldFiber.key) {
            break;
        }
        const newFiber = {
            type: newChild.type,
            key: newChild.key,
            props:newChild.props,
            node: oldFiber.node,
            base: oldFiber,
            return: workInProgressFiber,
            effectTag: UPDATE
        }

        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)

        if(previousNewFiber === null) {
            workInProgressFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

    if(oldFiber === null){
        for(;newIdx< newChildren.length; newIdx++){
            let newChild = newChildren[newIdx];
            const newFiber = {
                type: newChild.type,
                key: newChild.key,
                props:newChild.props,
                node: null,
                base: null,
                return: workInProgressFiber,
                effectTag: PLACEMENT
            }
            lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx)
            if(previousNewFiber === null) {
                workInProgressFiber.child = newFiber
            } else {
                previousNewFiber.sibling = newFiber
                oldFiber = nextOldFiber
            }

            previousNewFiber = newFiber
        }
    }

    const existingChildren = mapRemainingChildren(workInProgressFiber, oldFiber)
    for(;newIdx< newChildren.length; newIdx++) {
        let newChild = newChildren[newIdx];
        let newFiber = {
            type: newChild.type,
            key: newChild.key,
            props:newChild.props,
            // node: null,
            // base: null,
            return: workInProgressFiber,
            // effectTag: PLACEMENT
        }
        const matchedFiber = existingChildren.get(newChild.key===null ? newIdx:newChild.key )
        if(matchedFiber){
            newFiber = {
                ...newFiber,
                node: matchedFiber.node,
                base: matchedFiber,
                effectTag: UPDATE
            }
            shouldTrackSideEffects && existingChildren.delete(newChild.key===null ? newIdx:newChild.key )
        } else {
            newFiber = {
                ...newFiber,
                node: null,
                base: null,
                effectTag: PLACEMENT
            }
        }
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)
        if(previousNewFiber === null) {
            workInProgressFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

    if(shouldTrackSideEffects) {
        existingChildren.forEach((child => {
            deletions.push({
                ...child,
                effectTag:DELETIONS
            })
        }))
    }
}

function mapRemainingChildren(returnFiber, currentFirstChild) {
    const existingChildren = new Map();
    let existingChild = currentFirstChild
    while(existingChild){
        if(existingChild.key) {
            existingChild.set(existingChild.key || existingChild.index, existingChild)
        }
        existingChild = existingChild.sibling
    }

    return existingChildren;
}

function reconcileChildren_old(workInProgressFiber, children) {
    // 给children构建fiber架构
    let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
    let prevSibling = null;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      let newFiber = null;
      const sameType = child && oldFiber && child.type === oldFiber.type;
      if (sameType) {
        // todo 类型相同 复用
        newFiber = {
          type: child.type,
          props: child.props,
          node: oldFiber.node,
          base: oldFiber, //存储当前节点上一次的值
          return: workInProgressFiber,
          effectTag: UPDATE
        };
      }
      if (!sameType && child) {
        // 类型不同 child存在  新增插入
        newFiber = {
          type: child.type,
          props: child.props,
          node: null,
          base: null,
          return: workInProgressFiber,
          effectTag: PLACEMENT
        };
      }
  
      if (!sameType && oldFiber) {
        // todo 删除
        oldFiber.effectTag = DELETIONS;
        deletions.push(oldFiber);
      }
  
      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }
  
      if (i === 0) {
        workInProgressFiber.child = newFiber;
      } else {
        // i>0
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
    }
  
    // 基本构建完成 done
  }

function updateHostComponent(fiber) {
    if(!fiber.node){
        fiber.node = createNode(fiber)
    }
    //构建fiber架构
    const{children} = fiber.props;
    reconcileChildren(fiber, children)
}

function updateFunctionComponent(fiber){
    wipFiber = fiber;
    wipFiber.hooks = [];
    hookIndex = 0;
    const {type, props} = fiber;
    const children = [type(props)]
    reconcileChildren(fiber, children)
}

function updateClassComponent(fiber) {
    const {type, props} = fiber;
    const cmp = new type(props);
    const children = [cmp.render()]
    reconcileChildren(fiber, children)
}

function performUnitOfWork(fiber){
    // 执行当前任务
    const {type} = fiber;
    if(typeof type === 'function') {
        type.isReactComponent ? updateClassComponent(fiber) : updateFunctionComponent(fiber)
    }else {
        // 原生标签
        updateHostComponent(fiber)
    }
    // 返回下一个任务
    // 找到下一个任务 的有原则 原则是：先找子元素
    if(fiber.child) {
        return fiber.child;
    }

    // 原则二  如没有子元素，寻找兄弟元素
    let  nextFiber = fiber;
    while (nextFiber) {
        if(nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }
}
function workLoop(deadline) {
    // 查找下一个任务，并且当前帧没有结束
    while(nextUnitOfWork && deadline.timeRemaining() >1) {
        // 当前任务
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    // 所有任务执行完成
    //  todo  commit
    if(!nextUnitOfWork && wipRoot){
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null;
}

function getHostSibling(fiber){
    let sibling = fiber.return.child
    while(sibling) {
        if(fiber.index + 1 === sibling.index && sibling.effectTag === UPDATE) {
            return sibling.node;
        }
        sibling = sibling.sliding
    }
    return null;
}

function insertOrAppend(fiber,parentNode){
    let before = getHostSibling(fiber);
    let node = fiber.node;
    if(before){
        parentNode.insertBefore(node, before)
    } else {
        parentNode.appendChild(node)
    }
}

function commitWork(fiber){
    if(!fiber){
        return;
    }
    let parentNodeFiber = fiber.return;
    while(!parentNodeFiber.node){
        parentNodeFiber = parentNodeFiber.return
    }
    //ParentNode是指fiber的父node
    const parentNode = parentNodeFiber.node;
    if(fiber.effectTag === PLACEMENT && fiber.node !== null) {
        // parentNode.appendChild(fiber.node)
        // console.log(parentNode,fiber.node)
        insertOrAppend(fiber,parentNode)
    } else if(fiber.effectTag === UPDATE && fiber.node !== null){
        // 更新
        updateNode(fiber.node, fiber.base.props, fiber.props)
    }else if(fiber.effectTag === DELETIONS && fiber.node !== null){
        commitDeletions(fiber, parentNode)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

//  fiber是要删除的
function commitDeletions(fiber, parentNode){
    if(fiber.node) {
        parentNode.removeChild(fiber.node)
    } else {
        commitDeletions(fiber.child, parentNode)
    }
}

requestIdleCallback(workLoop)

// 当前正在工作中的fiber， work in progress
let wipFiber = null;
let hookIndex = null;
export function useState(init) {
    // 状态值：初始值以及改变之后的值
    const oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex];
    const hook = {state: oldHook ? oldHook.state : init, queue: []};
  
    const actions = oldHook ? oldHook.queue : [];
    actions.forEach(action => (hook.state = action));
  
    const setState = action => {
      hook.queue.push(action);
      wipRoot = {
        // ...currentRoot,
        node: currentRoot.node,
        props: currentRoot.props,
        base: currentRoot
      };
      deletions = [];
      nextUnitOfWork = wipRoot;
    };
    // [状态值，改变状态值的函数]
    wipFiber.hooks.push(hook);
    hookIndex++;
    console.log(hook.state, setState);
    
    return [hook.state, setState];
  }

export default {render}