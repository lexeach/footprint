import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Web3 from "web3";
import { FPrint, USDT, ICO } from "../../utils/web3.js";
const Dashboard = () => {
  window.Buffer = Buffer;

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

  const [account, setAccount] = useState();
  const [registration_Free, setRegistrationFee] = useState();
  const [currentId, setCurrentId] = useState();
  const [income, setIncome] = useState();
  const [planer, setPlaner] = useState();
  const [registerTimeStamp, setRegisterTimeStamp] = useState();
  const [registerPrice, setRegisterPrice] = useState();
  const [registerTokenPrice, setRegisterTokenPrice] = useState();
  const [registerCurrentUserId, setRegisterCurrentUserId] = useState();
  const [registerLevelIncomeReceived, setRegisterLevelIncomeReceived] =
    useState();
  const [registerReferredUsers, setRegisterReferredUsers] = useState();

  const [winAmount, setWinAmount] = useState();
  const [regId, setRegId] = useState();

  const [pool1_price, setPool1_price] = useState();
  const [pool1activeUserID, setPool1activeUserID] = useState();
  const [pool1currUserID, setPool1currUserID] = useState();
  const [pool1Id, setPool1Id] = useState();
  const [pool1PaymentReceived, setPool1PaymentReceived] = useState();
  const [pool1Income, setPool1Income] = useState();
  const [pool1UsedIncome, setPool1UsedIncome] = useState();
  const [pool1IncomeBalance, setPool1IncomeBalance] = useState();
  const [currentDateEpoch, setCurrentDateEpoch] = useState();
  const [sponsorPool1Recieved, setSponsorPool1Recieved] = useState();
  const [partnerPool1Recieved, setPartnerPool1Recieved] = useState();

  const [pool2_price, setPool2_price] = useState();
  const [pool2activeUserID, setPool2activeUserID] = useState();
  const [pool2currUserID, setPool2currUserID] = useState();
  const [pool2Id, setPool2Id] = useState();
  const [pool2PaymentReceived, setPool2PaymentReceived] = useState();
  const [pool2Income, setPool2Income] = useState();
  const [pool2UsedIncome, setPool2UsedIncome] = useState();
  const [pool2IncomeBalance, setPool2IncomeBalance] = useState();
  const [sponsorPool2Recieved, setSponsorPool2Recieved] = useState();
  const [partnerPool2Recieved, setPartnerPool2Recieved] = useState();

  const [pool3_price, setPool3_price] = useState();
  const [pool3activeUserID, setPool3activeUserID] = useState();
  const [pool3currUserID, setPool3currUserID] = useState();
  const [pool3Id, setPool3Id] = useState();
  const [pool3PaymentReceived, setPool3PaymentReceived] = useState();
  const [pool3Income, setPool3Income] = useState();
  const [pool3UsedIncome, setPool3UsedIncome] = useState();
  const [pool3IncomeBalance, setPool3IncomeBalance] = useState();
  const [sponsorPool3Recieved, setSponsorPool3Recieved] = useState();
  const [partnerPool3Recieved, setPartnerPool3Recieved] = useState();

  const [taxRate, setTaxRate] = useState();

  const [loading, setLoading] = useState(false);
  const [referrerId, setReferrerId] = useState();
  const [coReferrerId, setCoReferrerId] = useState();
  const [identity, setIdentity] = useState();

  const [pool2Exist, setPool2Exist] = useState();
  const [pool3Exist, setPool3Exist] = useState();
  const [pool4Exist, setPool4Exist] = useState();

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.requestAccounts();
      if (!accounts) {
        alert("please install metamask");
      }

      setAccount(accounts[0]);
      console.log("Account is ", account);
      // let BEP20_ = new web3.eth.Contract(BEP20.ABI, BEP20.address);
      let NEW_CBC_ROI = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      let ICO_ = new web3.eth.Contract(ICO.ABI, ICO.address);
      let RegistrationFee = await NEW_CBC_ROI.methods
        .REGESTRATION_FESS()
        .call();
      console.log("Accounts of zero is :", accounts[0]);

      const convert_regfee = Number(
        web3.utils.fromWei(RegistrationFee, "ether")
      ).toFixed(4);
      setRegistrationFee(convert_regfee);
      // set Last TopUp:  Current Id of ICO
      let currentID = await ICO_.methods.currUserID().call();
      setCurrentId(currentID);

      let tokenPrices = await ICO_.methods.tokenPrice().call();
      let incomes = await NEW_CBC_ROI.methods.income(accounts[0]).call();

      setIncome(Number(web3.utils.fromWei(incomes.income, "ether")).toFixed(4));
      setPlaner(incomes.planer);

      let registers = await NEW_CBC_ROI.methods.register(accounts[0]).call();

      setRegisterTimeStamp(await epochToDate(registers.timeStamp));
      console.log("registers.winAmount", registers.winAmount);
      setWinAmount(
        Number(
          web3.utils.fromWei(
            registers.winAmount ? registers.winAmount : "0",
            "ether"
          )
        ).toFixed(4)
      );
      setRegId(registers.id);
      setRegisterPrice(
        Number(web3.utils.fromWei(registers.price, "ether")).toFixed(4)
      );
      setRegisterTokenPrice(
        Number(web3.utils.fromWei(tokenPrices, "ether")).toFixed(4)
      );
      setRegisterCurrentUserId(registers.currentUserID);
      setRegisterLevelIncomeReceived(
        Number(
          web3.utils.fromWei(registers.levelIncomeReceived, "ether")
        ).toFixed(4)
      );
      setRegisterReferredUsers(registers.referredUsers);

      let pool1Price = await NEW_CBC_ROI.methods.pool1_price().call();
      setPool1_price(
        Number(web3.utils.fromWei(pool1Price, "ether")).toFixed(4)
      );
      let texRates = await NEW_CBC_ROI.methods.taxRate().call();
      console.log("Tax Rate is setting : ", texRates);
      setTaxRate(texRates);
      let pool1activeUserIDs = await NEW_CBC_ROI.methods
        .pool1activeUserID()
        .call();
      setPool1activeUserID(pool1activeUserIDs);

      let pool1currUserIDs = await NEW_CBC_ROI.methods.pool1currUserID().call();
      setPool1currUserID(pool1currUserIDs);

      let pool1userss = await NEW_CBC_ROI.methods
        .pool1users(accounts[0])
        .call();

      setPool1Id(pool1userss.id);
      setPool1PaymentReceived(
        Number(
          web3.utils.fromWei(pool1userss.payment_received, "ether")
        ).toFixed(4)
      );

      setPartnerPool1Recieved(
        Number(
          web3.utils.fromWei(pool1userss.PartnerPoolRecieved, "ether")
        ).toFixed(4)
      );
      setSponsorPool1Recieved(
        Number(
          web3.utils.fromWei(pool1userss.SponsorPoolRecieved, "ether")
        ).toFixed(4)
      );
      setPool1Income(
        Number(
          web3.utils.fromWei(
            (Number(pool1userss.usedIncome) + Number(pool1userss.balanceIncome)
              ? Number(pool1userss.usedIncome) +
                Number(pool1userss.balanceIncome)
              : 0
            ).toString(),
            "ether"
          )
        ).toFixed(4)
      );
      setPool1UsedIncome(
        Number(
          web3.utils.fromWei(
            (pool1userss.usedIncome ? pool1userss.usedIncome : 0).toString(),
            "ether"
          )
        ).toFixed(4)
      );
      setPool1IncomeBalance(
        Number(web3.utils.fromWei(pool1userss.balanceIncome, "ether")).toFixed(
          4
        )
      );

      let pool2Price = await NEW_CBC_ROI.methods.pool2_price().call();
      setPool2_price(
        Number(web3.utils.fromWei(pool2Price, "ether")).toFixed(4)
      );

      let pool2activeUserIDs = await NEW_CBC_ROI.methods
        .pool2activeUserID()
        .call();
      setPool2activeUserID(pool2activeUserIDs);

      let pool2currUserIDs = await NEW_CBC_ROI.methods.pool2currUserID().call();
      setPool2currUserID(pool2currUserIDs);

      let pool2userss = await NEW_CBC_ROI.methods
        .pool2users(accounts[0])
        .call();
      setPool2Exist(pool2userss.isExist);
      setPool2Id(pool2userss.id);
      setPool2PaymentReceived(
        Number(
          web3.utils.fromWei(pool2userss.payment_received, "ether")
        ).toFixed(4)
      );
      setPool2Income(
        Number(
          web3.utils.fromWei(
            (Number(pool2userss.usedIncome) + Number(pool2userss.balanceIncome)
              ? Number(pool2userss.usedIncome) +
                Number(pool2userss.balanceIncome)
              : 0
            ).toString(),
            "ether"
          )
        ).toFixed(4)
      );
      setPool2UsedIncome(
        Number(
          web3.utils.fromWei(
            (pool2userss.usedIncome ? pool2userss.usedIncome : 0).toString(),
            "ether"
          )
        ).toFixed(4)
      );
      setPool2IncomeBalance(
        Number(web3.utils.fromWei(pool2userss.balanceIncome, "ether")).toFixed(
          4
        )
      );
      setPartnerPool2Recieved(
        Number(
          web3.utils.fromWei(pool2userss.PartnerPoolRecieved, "ether")
        ).toFixed(4)
      );
      setSponsorPool2Recieved(
        Number(
          web3.utils.fromWei(pool2userss.SponsorPoolRecieved, "ether")
        ).toFixed(4)
      );

      let pool3Price = await NEW_CBC_ROI.methods.pool3_price().call();
      setPool3_price(
        Number(web3.utils.fromWei(pool3Price, "ether")).toFixed(4)
      );

      let pool3activeUserIDs = await NEW_CBC_ROI.methods
        .pool3activeUserID()
        .call();
      setPool3activeUserID(pool3activeUserIDs);

      let pool3currUserIDs = await NEW_CBC_ROI.methods.pool3currUserID().call();
      setPool3currUserID(pool3currUserIDs);

      let pool3userss = await NEW_CBC_ROI.methods
        .pool3users(accounts[0])
        .call();

      setPool3Exist(pool3userss.isExist);
      setPool3Id(pool3userss.id);
      setPool3PaymentReceived(
        Number(
          web3.utils.fromWei(pool3userss.payment_received, "ether")
        ).toFixed(4)
      );
      setPartnerPool3Recieved(
        Number(
          web3.utils.fromWei(pool3userss.PartnerPoolRecieved, "ether")
        ).toFixed(4)
      );
      setSponsorPool3Recieved(
        Number(
          web3.utils.fromWei(pool2userss.SponsorPoolRecieved, "ether")
        ).toFixed(4)
      );
      setPool3Income(
        Number(
          web3.utils.fromWei(
            (Number(pool3userss.usedIncome) + Number(pool3userss.balanceIncome)
              ? Number(pool3userss.usedIncome) +
                Number(pool3userss.balanceIncome)
              : 0
            ).toString(),
            "ether"
          )
        ).toFixed(4)
      );
      setPool3UsedIncome(
        Number(
          web3.utils.fromWei(
            (pool3userss.usedIncome ? pool3userss.usedIncome : 0).toString(),
            "ether"
          )
        ).toFixed(4)
      );
      setPool3IncomeBalance(
        Number(web3.utils.fromWei(pool3userss.balanceIncome, "ether")).toFixed(
          4
        )
      );

      const currentDate = new Date();

      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
      const year = currentDate.getFullYear();

      const currentDateEpoch = `${day}/${month}/${year}`;
      setCurrentDateEpoch(currentDateEpoch);
    }

    load();
  }, []);

  async function epochToDate(epochTime) {
    // Convert epoch time to milliseconds (JavaScript uses milliseconds)
    // Convert epoch to milliseconds
    if (epochTime == undefined || Number(epochTime) <= 0) {
      return 0;
    }
    const milliseconds = epochTime * 1000;
    console.log("millisecond:", milliseconds);
    // Create a new Date object
    const date = new Date(milliseconds);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  const handleChangeReferrerId = (event) => {
    setReferrerId(event.target.value);
  };
  const handleChangeCoReferrerId = (event) => {
    setCoReferrerId(event.target.value);
  };
  const handleChangeIdentity = (event) => {
    setIdentity(event.target.value);
  };
  // Registration  Write function Called
  const handleSubmitRegistration = async (event) => {
    event.preventDefault();
    try {
      const isEthereumAddress = /^(0x)?[0-9a-fA-F]{40}$/.test(referrerId);
      let total =
        Number(registration_Free) + Number((registration_Free * taxRate) / 100);
      let amount = web3.utils.toWei(total.toString(), "ether");
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);
      let isAllowance = await USDT_.methods
        .allowance(account, FPrint.address)
        .call();
      let isApprove, reg_user;
      if (isAllowance < amount) {
        setLoading(true);

        isApprove = await USDT_.methods
          .approve(FPrint.address, amount)
          .send({ from: account })
          .on("receipt", async function (receipt) {
            setLoading(false);
            if (!isEthereumAddress) {
              reg_user = await FPrint_.methods
                .Registration(referrerId, coReferrerId, amount, identity)
                .send({ from: account, value: 0 });
            } else {
              reg_user = await FPrint_.methods
                .Registration2(referrerId, coReferrerId, amount, identity)
                .send({ from: account, value: 0 });
            }

            console.log("****** native coin accepting condtion", reg_user);
            if (reg_user.status) {
              alert("Registerd Success");
            } else {
              alert("Registerd Failed !!!!");
            }
          })
          .on("error", function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            setLoading(false);
          });
      } else {
        if (!isEthereumAddress) {
          reg_user = await FPrint_.methods
            .Registration(referrerId, coReferrerId, amount, identity)
            .send({ from: account, value: 0 });
        } else {
          reg_user = await FPrint_.methods
            .Registration2(referrerId, coReferrerId, amount, identity)
            .send({ from: account, value: 0 });
        }
        console.log("****** native coin accepting condtion", reg_user);
        if (reg_user.status) {
          alert("Registerd Success");
        } else {
          alert("Registerd Failed !!!!");
        }
      }
    } catch (e) {
      console.log("Error: ", e);
      alert("Error is catched", e);
    }
  };

  const handleSubmitIUpdatePool2 = async (event) => {
    event.preventDefault();
    try {
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);
      console.log("Tax Rate is :", taxRate);
      let amount = web3.utils.toWei(
        Number(pool2_price) + (Number(pool2_price) * Number(taxRate)) / 100,
        "wei"
      );
      console.log("Amount : ", amount);
      // require(total >= pool2_price + (pool2_price * taxRate / 100), "pool1 income is less" );

      setLoading(true);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);

      await USDT_.methods
        .approve(FPrint.address, amount)
        .send({ from: account })
        .on("receipt", async function (receipt) {
          setLoading(false);

          let reg_user = await FPrint_.methods
            .upgradePool2(amount)
            .send({ from: account });
          console.log("****** native coin accepting condtion", reg_user);
          if (reg_user.status) {
            alert("Registerd Success");
          } else {
            alert("Registerd Failed !!!!");
          }
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          setLoading(false);
        });
    } catch (e) {
      alert("Error is catched");
    }
  };
  const handleSubmitIUpdatePool3 = async (event) => {
    event.preventDefault();
    try {
      let FPrint_ = new web3.eth.Contract(FPrint.ABI, FPrint.address);

      let amount =
        Number(pool3_price) + (Number(pool3_price) * Number(taxRate)) / 100;
      // require(total >= pool2_price + (pool2_price * taxRate / 100), "pool1 income is less" );

      setLoading(true);
      let USDT_ = new web3.eth.Contract(USDT.ABI, USDT.address);

      await USDT_.methods
        .approve(FPrint.address, amount)
        .send({ from: account })
        .on("receipt", async function (receipt) {
          setLoading(false);

          let reg_user = await FPrint_.methods
            .upgradePool3(amount)
            .send({ from: account });
          console.log("****** native coin accepting condtion", reg_user);
          if (reg_user.status) {
            alert("Registerd Success");
          } else {
            alert("Registerd Failed !!!!");
          }
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
          setLoading(false);
        });

      // await FPrint_.methods.upgradePool3().send({ from: account });
    } catch (e) {
      alert("Error is catched");
    }
  };

  return (
    <div className="home-container">
      <div className="card-container container1">
        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">Public Value</div>
          </div>
        </div>
        <div className="row">
          {/* Registration Fee  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Registration Fee</h5>
                <h4 className="mb-0">
                  {registration_Free ? registration_Free : 0} USDT
                </h4>
              </div>
            </div>
          </div>

          {/* User ID  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>User ID</h5>
                <h4 className="mb-0">{regId ? regId : 0}</h4>
              </div>
            </div>
          </div>
          {/* registerLevelIncomeReceived  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Level Income Received</h5>
                <h4 className="mb-0">
                  {registerLevelIncomeReceived
                    ? registerLevelIncomeReceived
                    : 0}
                </h4>
              </div>
            </div>
          </div>
          {/* registerReferredUsers  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Referred Users</h5>
                <h4 className="mb-0">
                  {registerReferredUsers ? registerReferredUsers : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* User Win Amount  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Win Amount</h5>
                <h4 className="mb-0">{winAmount ? winAmount : 0}</h4>
              </div>
            </div>
          </div>

          {/* income */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Income</h5>
                <h4 className="mb-0">{income ? income : 0}</h4>
              </div>
            </div>
          </div>

          {/* income */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Planer</h5>
                <h4 className="mb-0">{planer ? planer : 0}</h4>
              </div>
            </div>
          </div>

          {/* Register Current UserID  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body-id">
                <h5>Staked User ID</h5>
                <h4 className="mb-0">
                  {registerCurrentUserId ? registerCurrentUserId : 0}
                </h4>
              </div>
            </div>
          </div>
          {/* Current User Fee  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body-id">
                <h5>Current User ID FP</h5>
                <h4 className="mb-0">{currentId ? currentId : 0}</h4>
              </div>
            </div>
          </div>

          {/*  Register Token Price  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body-price">
                <h5>Token Price</h5>
                <h4 className="mb-0">
                  {registerTokenPrice ? registerTokenPrice : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Register Price  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body-price">
                <h5>Register Price</h5>
                <h4 className="mb-0">{registerPrice ? registerPrice : 0}</h4>
              </div>
            </div>
          </div>

          {/* Register Time  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body-time">
                <h5>Register Time</h5>
                <h4 className="mb-0">
                  {registerTimeStamp ? registerTimeStamp : "00/00/00"}
                </h4>
              </div>
            </div>
          </div>
          {/* Register Time  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body-time">
                <h5>Current Time</h5>
                <h4 className="mb-0">
                  {currentDateEpoch ? currentDateEpoch : 0}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pool 1 Row Container */}
      <div className="card-container container2">
        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">Pool1 Value</div>
          </div>
        </div>
        <div className="row">
          {/* pool1_price */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool1 Price</h5>
                <h4 className="mb-0">{pool1_price ? pool1_price : 0} USDT</h4>
              </div>
            </div>
          </div>

          {/* pool1activeUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool1 Active User ID</h5>
                <h4 className="mb-0">
                  {pool1activeUserID ? pool1activeUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* pool1currUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool1 Current User ID</h5>
                <h4 className="mb-0">
                  {pool1currUserID ? pool1currUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/*  User ID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Users ID</h5>
                <h4 className="mb-0">{pool1Id ? pool1Id : 0}</h4>
              </div>
            </div>
          </div>

          {/* Payment Received  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Payment Received</h5>
                <h4 className="mb-0">
                  {pool1PaymentReceived ? pool1PaymentReceived : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Pool Income  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool Income</h5>
                <h4 className="mb-0">{pool1Income ? pool1Income : 0}</h4>
              </div>
            </div>
          </div>
          {/* Income USed  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Income Used</h5>
                <h4 className="mb-0">
                  {pool1UsedIncome ? pool1UsedIncome : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Income Balance  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Income Balance</h5>
                <h4 className="mb-0">
                  {pool1IncomeBalance ? pool1IncomeBalance : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Partner Pool  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Partner Pool Recieved</h5>
                <h4 className="mb-0">
                  {partnerPool1Recieved ? partnerPool1Recieved : 0}
                </h4>
              </div>
            </div>
          </div>
          {/* SponsorPoolRecieved  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Sponsor Pool Recieved</h5>
                <h4 className="mb-0">
                  {sponsorPool1Recieved ? sponsorPool1Recieved : 0}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body-reg">
                <h5>Upgrade Pool2</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitIUpdatePool2}
                    >
                      <div className="form-group w-100">
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Update Pool"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pool 2Row Container */}
      <div className="card-container container3">
        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">Pool2 Value</div>
          </div>
        </div>
        <div className="row">
          {/* pool1_price */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool2 Price</h5>
                <h4 className="mb-0">{pool2_price ? pool2_price : 0} USDT</h4>
              </div>
            </div>
          </div>

          {/* pool1activeUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool2 Active User ID</h5>
                <h4 className="mb-0">
                  {pool2activeUserID ? pool2activeUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* pool1currUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool2 Current User ID</h5>
                <h4 className="mb-0">
                  {pool2currUserID ? pool2currUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/*  User ID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Users ID</h5>
                <h4 className="mb-0">{pool2Id ? pool2Id : 0}</h4>
              </div>
            </div>
          </div>

          {/* Payment Received  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Payment Received</h5>
                <h4 className="mb-0">
                  {pool2PaymentReceived ? pool2PaymentReceived : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Pool Income  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool Income</h5>
                <h4 className="mb-0">{pool2Income ? pool2Income : 0}</h4>
              </div>
            </div>
          </div>
          {/* Income USed  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Income Used</h5>
                <h4 className="mb-0">
                  {pool2UsedIncome ? pool2UsedIncome : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Income Balance  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Income Balance</h5>
                <h4 className="mb-0">
                  {pool2IncomeBalance ? pool2IncomeBalance : 0}
                </h4>
              </div>
            </div>
          </div>
          {/* PartnerPoolRecieved   */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Partner Pool Recieved</h5>
                <h4 className="mb-0">
                  {partnerPool2Recieved ? partnerPool2Recieved : 0}
                </h4>
              </div>
            </div>
          </div>
          {/* SponsorPoolRecieved  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Sponsor Pool Recieved </h5>
                <h4 className="mb-0">
                  {sponsorPool2Recieved ? sponsorPool2Recieved : 0}
                </h4>
              </div>
            </div>
          </div>
          {/* Income PartnerPoolRecieved  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> PartnerPoolRecieved</h5>
                <h4 className="mb-0">
                  {partnerPool2Recieved ? partnerPool2Recieved : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* SponsorPoolRecieved  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Sponsor Pool Recieved</h5>
                <h4 className="mb-0">
                  {sponsorPool2Recieved ? sponsorPool2Recieved : 0}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 grid-margin">
            <div className="card">
              <div className="card-body-reg">
                <h5>Upgrade Pool3</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitIUpdatePool3}
                    >
                      <div className="form-group w-100">
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Update Pool"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pool 3 Row Container */}
      <div className="card-container container4">
        <div className="col-sm-12 grid-margin">
          <div className="card">
            <div className="card-body text-center">Pool3 Value</div>
          </div>
        </div>
        <div className="row">
          {/* pool1_price */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool3 Price</h5>
                <h4 className="mb-0">{pool3_price ? pool3_price : 0} USDT</h4>
              </div>
            </div>
          </div>

          {/* pool1activeUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool3 Active User ID</h5>
                <h4 className="mb-0">
                  {pool3activeUserID ? pool3activeUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* pool1currUserID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool3 Current User ID</h5>
                <h4 className="mb-0">
                  {pool3currUserID ? pool3currUserID : 0}
                </h4>
              </div>
            </div>
          </div>

          {/*  User ID */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Users ID</h5>
                <h4 className="mb-0">{pool3Id ? pool3Id : 0}</h4>
              </div>
            </div>
          </div>

          {/* Payment Received  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Payment Received</h5>
                <h4 className="mb-0">
                  {pool3PaymentReceived ? pool3PaymentReceived : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Pool Income  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Pool Income</h5>
                <h4 className="mb-0">{pool3Income ? pool3Income : 0}</h4>
              </div>
            </div>
          </div>
          {/* Income USed  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Income Used</h5>
                <h4 className="mb-0">
                  {pool3UsedIncome ? pool3UsedIncome : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* Income Balance  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Income Balance</h5>
                <h4 className="mb-0">
                  {pool3IncomeBalance ? pool3IncomeBalance : 0}
                </h4>
              </div>
            </div>
          </div>
          {/*  PartnerPoolRecieved  */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Partner Pool Recieved</h5>
                <h4 className="mb-0">
                  {partnerPool3Recieved ? partnerPool3Recieved : 0}
                </h4>
              </div>
            </div>
          </div>

          {/* PartnerPoolRecieved   */}
          <div className="col-lg-4 col-md-6 col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5> Partner Pool Recieved </h5>
                <h4 className="mb-0">
                  {partnerPool3Recieved ? partnerPool3Recieved : 0}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-container container6">
        <div className="col-sm-12 grid-margin">
          <div className="card mx-auto">
            <div className="card-body text-center">Signing Section</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 grid-margin">
            <div className="card-reg">
              <div className="card-body-reg">
                <h5>Registration</h5>
                <div className="row">
                  <div className="col-sm-12 my-auto">
                    <form
                      className="forms-sample"
                      onSubmit={handleSubmitRegistration}
                    >
                      <div className="form-group w-100">
                        <input
                          className="form-control mt-2"
                          type="text"
                          required
                          name="referrerId"
                          onChange={handleChangeReferrerId}
                          value={referrerId || ""}
                          placeholder="Number ID or Address"
                        />

                        <input
                          className="form-control mt-2"
                          type="number"
                          required
                          name="coReferrerId"
                          onChange={handleChangeCoReferrerId}
                          value={coReferrerId || ""}
                          placeholder="Co Referrer ID"
                        />

                        <input
                          className="form-control mt-2"
                          type="string"
                          required
                          name="identity"
                          onChange={handleChangeIdentity}
                          value={identity || ""}
                          placeholder="Identity"
                        />

                        {loading && (
                          <div className="loader-overlay">
                            {" "}
                            Transaction is Approving{" "}
                          </div>
                        )}
                        <input
                          className="btn mt-3 submitbtn_"
                          type="submit"
                          value="Registration"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
