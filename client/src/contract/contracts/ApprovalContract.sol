pragma solidity ^0.5.8;

contract ApprovalContract {

  address public sender;
  address payable public receiver;
  address constant public approver = 0x7285E18B04c28A901277bb117B4033bCE88f2c14;

  constructor() public {
    // tbd
  }

  function deposit(address payable _receiver) external payable {
    require(msg.value > 0);
    sender = msg.sender;
    receiver = _receiver;
  }

  function viewApprover() external pure returns(address) {
    return(approver);
  }

  function approve() external {
    require(msg.sender == approver);
    receiver.transfer(address(this).balance);
  }

}
