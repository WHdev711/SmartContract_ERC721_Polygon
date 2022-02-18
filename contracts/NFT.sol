// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, PullPayment, Ownable {
    using Counters for Counters.Counter;
    uint256 public tempcounter = 0;

    // The mint user info structure
    struct MintUserDetail {
        address mintuser;
        uint256 currentminttimestamp;
        uint256 price_value;
        uint256 tokenID;
    }

    MintUserDetail[] public mintuserlist;

    // Constants. Define Total supply.
    uint256 public constant TOTAL_SUPPLY = 10000;

    Counters.Counter private currentTokenId;

    // @dev bse token URI used as a prefix by tokenURI()
    string public baseTokenURI;

    constructor() ERC721("CiMPLE", "NFT") {
        baseTokenURI = "";
    }

    function mintTo(address recipient)
        public
        payable
        returns (uint256)
    {
        uint256 tokenId =  currentTokenId.current();
        require(tokenId < TOTAL_SUPPLY, "Max supply reached");
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    // @dev Returns an URI for a given token ID
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    // @dev Return mint address list
    function getmintaddress()
        external
        view
        returns (
            address[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory
        )
    {
        address[] memory tempuserlist = new address[](tempcounter);
        uint256[] memory temptime = new uint256[](tempcounter);
        uint256[] memory tempprice = new uint256[](tempcounter);
        uint256[] memory tokenIDs = new uint256[](tempcounter);
        for (uint256 i = 0; i < tempcounter; i++) {
            tempuserlist[i] = (mintuserlist[i].mintuser);
            temptime[i] = (mintuserlist[i].currentminttimestamp);
            tempprice[i] = (mintuserlist[i].price_value);
            tokenIDs[i] = (mintuserlist[i].tokenID);
        }
        return (tempuserlist, temptime, tempprice, tokenIDs);
    }

    // @dev Sets the base token URI prefix
    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    // @dev Overridden in order to make it an onlyOwner function
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);
        if (from != address(0)) {
            mintuserlist[tokenId - 1].mintuser = to;
            mintuserlist[tokenId - 1].currentminttimestamp = block.timestamp;
        } else {
            mintuserlist.push(
                MintUserDetail(to, block.timestamp, msg.value, tokenId)
            );
            tempcounter++;
        }
    }

    function getTempaccount() public view returns (uint256) {
        return tempcounter;
    }
}
