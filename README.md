![cf](http://i.imgur.com/7v5ASc8.png) Lab 15- Binary Tree Data Structure
====
[![Build Status](https://travis-ci.com/TCW417/15-BinaryTree.svg?branch=master)](https://travis-ci.com/TCW417/15-BinaryTree)

This lab implements a simple binary tree data structure and methods for doing pre-, in-, and post-order traversals.  See ./src/__test__/binary-tree.js for examples.


### INSTALLATION

  - Assuming you have git, node.js and npm installed, clone https://github.com/TCW417/15-BinaryTree.git into a directory of your choice.  (If you don't have git, node.js and npm installed, please google instructions on how to install these tools.) 
  - run `npm init -y`
  - run `npm i`
  - run `npm test` to execute tests

### USE OF THE LIBRARY

The following code snippet demonstrates use of the library:
```
// binary-tree creates a small binary tree data structure and exports it. 
// Look in binary-tree.js for an example of how to build your own tree.
import binaryTree from '../model/binary-tree';

// traversals.js is the module that exports the three tree traversal methods provided by
// the library.
import { preOrderTraversal, inOrderTraversal, postOrderTraversal } from '../lib/traversals';

// Do an in-order traversal, returning the values as elements in an array:

const vals = [];
inOrderTraversal(binaryTree.root, (v) => {
  vals.push(v);
});
```

### USE OF THE API

The api requires a server to be started.  At your terminal within the install directory type
`node index.js`.

Once you see the `Server up on port 3000` message, use postman or your browser to access the api.

#### GET /api/tree

This call returns an array containing all of the trees in the database.  Currently there's only one ("Lab-15"), and no api for creating another, but it could happen...

Returns
```
[
    "Lab-15"
]
```

#### GET /api/tree/yourTreeName

Returns yourTreeName tree as a JSON string. For example `GET /api/tree/Lab-15` returns
```
{
    "name": "Lab-15",
    "root": {
        "left": {
            "left": {
                "left": null,
                "right": {
                    "left": {
                        "left": null,
                        "right": null,
                        "value": 8
                    },
                    "right": {
                        "left": null,
                        "right": null,
                        "value": 9
                    },
                    "value": 7
                },
                "value": 6
            },
            "right": null,
            "value": 2
        },
        "right": {
            "left": {
                "left": null,
                "right": null,
                "value": 4
            },
            "right": {
                "left": null,
                "right": null,
                "value": 5
            },
            "value": 3
        },
        "value": 1
    }
}
```

Returns status 404 if yourTreeName isn't found.

#### GET /api/tree/yourTreeName/[preorder | inorder | postorder | json]

Performs the requested traversal of yourTreeName and returns the values as a JSON string.  Option json is equivalent to calling /api/tree/yourTreeName. For example: `GET /api/tree/Lab-15/inorder` returns
```
{
    "method": "inorder",
    "values": [
        6,
        8,
        7,
        9,
        2,
        1,
        4,
        3,
        5
    ]
}
```
Returns 404 if yourTreeName isn't found and 400 if requested traversal is unknown.