async function connectWallet() {
  return (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
}

export { connectWallet };
