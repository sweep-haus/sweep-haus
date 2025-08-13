// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract EditionDrop is Initializable, ERC1155Upgradeable, OwnableUpgradeable {
    uint256 private _nextTokenId;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory uri,
        address initialOwner
    ) public initializer {
        __ERC1155_init(uri);
        __Ownable_init(initialOwner);
    }

    function mint(address to, uint256 amount) public {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId, amount, "");
    }
}