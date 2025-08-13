import { ethers } from "hardhat";
import { expect } from "chai";

describe("NFTFactory", function () {
    it("Should deploy the factory and create NFT contracts", async function () {
        const [owner] = await ethers.getSigners();

        const CollectionDrop = await ethers.getContractFactory("CollectionDrop");
        const collectionDrop = await CollectionDrop.deploy();
        await collectionDrop.waitForDeployment();
        const collectionDropAddress = await collectionDrop.getAddress();

        const EditionDrop = await ethers.getContractFactory("EditionDrop");
        const editionDrop = await EditionDrop.deploy();
        await editionDrop.waitForDeployment();
        const editionDropAddress = await editionDrop.getAddress();

        const NFTFactory = await ethers.getContractFactory("NFTFactory");
        const nftFactory = await NFTFactory.deploy(collectionDropAddress, editionDropAddress);
        await nftFactory.waitForDeployment();

        await nftFactory.createCollectionDrop("Test Collection", "TC", owner.address);
        const collectionContracts = await nftFactory.getCollectionContracts();
        expect(collectionContracts.length).to.equal(1);

        await nftFactory.createEditionDrop("ipfs://test", owner.address);
        const editionContracts = await nftFactory.getEditionContracts();
        expect(editionContracts.length).to.equal(1);

        const collectionClone = await ethers.getContractAt("CollectionDrop", collectionContracts[0]);
        await collectionClone.mint(owner.address);
        expect(await collectionClone.ownerOf(0)).to.equal(owner.address);
        expect(await collectionClone.owner()).to.equal(owner.address);


        const editionClone = await ethers.getContractAt("EditionDrop", editionContracts[0]);
        await editionClone.mint(owner.address, 1);
        expect(await editionClone.balanceOf(owner.address, 0)).to.equal(1);
        expect(await editionClone.owner()).to.equal(owner.address);
    });
});
