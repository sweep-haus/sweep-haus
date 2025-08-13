// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./CollectionDrop.sol";
import "./EditionDrop.sol";

contract NFTFactory {
    address public immutable collectionDropImplementation;
    address public immutable editionDropImplementation;

    address[] private _collectionContracts;
    address[] private _editionContracts;

    event CollectionDropDeployed(address indexed contractAddress, string name, string symbol, address indexed owner);
    event EditionDropDeployed(address indexed contractAddress, string uri, address indexed owner);

    constructor(address _collectionDropImplementation, address _editionDropImplementation) {
        collectionDropImplementation = _collectionDropImplementation;
        editionDropImplementation = _editionDropImplementation;
    }

    function createCollectionDrop(string memory name, string memory symbol, address owner) external {
        address clone = Clones.clone(collectionDropImplementation);
        CollectionDrop(clone).initialize(name, symbol, owner);
        _collectionContracts.push(clone);
        emit CollectionDropDeployed(clone, name, symbol, owner);
    }

    function createEditionDrop(string memory uri, address owner) external {
        address clone = Clones.clone(editionDropImplementation);
        EditionDrop(clone).initialize(uri, owner);
        _editionContracts.push(clone);
        emit EditionDropDeployed(clone, uri, owner);
    }

    function getCollectionContracts() external view returns (address[] memory) {
        return _collectionContracts;
    }

    function getEditionContracts() external view returns (address[] memory) {
        return _editionContracts;
    }
}
