import { ethers } from "hardhat";

async function main() {
  const CollectionDrop = await ethers.getContractFactory("CollectionDrop");
  const collectionDrop = await CollectionDrop.deploy();
  await collectionDrop.waitForDeployment();
  const collectionDropAddress = await collectionDrop.getAddress();
  console.log("CollectionDrop implementation deployed to:", collectionDropAddress);

  const EditionDrop = await ethers.getContractFactory("EditionDrop");
  const editionDrop = await EditionDrop.deploy();
  await editionDrop.waitForDeployment();
  const editionDropAddress = await editionDrop.getAddress();
  console.log("EditionDrop implementation deployed to:", editionDropAddress);

  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const nftFactory = await NFTFactory.deploy(collectionDropAddress, editionDropAddress);
  await nftFactory.waitForDeployment();
  const nftFactoryAddress = await nftFactory.getAddress();
  console.log("NFTFactory deployed to:", nftFactoryAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});