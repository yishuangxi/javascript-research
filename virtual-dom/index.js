/**
 * Created by Yi on 2017/1/5.
 */

function VirtualDom(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
}

function createVirtualDom(type, props, children) {
    return new VirtualDom(type, props, children)
}


var virtualDomTree = createVirtualDom(
    'div',
    {
        className: 'div'
    }, [
        createVirtualDom(
            'p', {className: 'p'}, ['这是一个段落', '这是一个段落', '这是一个段落']
        ),

        createVirtualDom(
            'ul', {className: 'list', width: '100px'}, [
                createVirtualDom('li', {className: 'list'}, ['item 1']),
                createVirtualDom('li', {className: 'list'}, ['item 2'])
            ]
        ),

        createVirtualDom(
            'ul', {className: 'list', width: '100px'}, [
                createVirtualDom('li', {className: 'list'}, ['item 3']),
                createVirtualDom('li', {className: 'list'}, ['item 4'])
            ]
        )
    ])

var createTrueDom = function (tree, root) {
    if (!root) {
        root = document.createDocumentFragment()
    }
    if (typeof tree === 'object') {
        var node = document.createElement(tree.type)
        for (var p in tree.props) {
            if (tree.props.hasOwnProperty(p)) {
                var attr_name = p, attr_value = tree.props[p]
                if (attr_name === 'className') {
                    attr_name = 'class'
                }
                node.setAttribute(attr_name, tree.props[p])
            }
        }
        root.appendChild(node)
        if (tree.children && tree.children.length) {
            for (var i = 0; i < tree.children.length; i++) {
                createTrueDom(tree.children[i], node)
            }
        }
    } else if (typeof tree === 'string') {
        root.appendChild(document.createTextNode(tree))
    }

    return root
}

var el = createTrueDom(virtualDomTree)

document.querySelector('#root').appendChild(el)

