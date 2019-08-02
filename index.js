class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0
    for (let key of this.transactions) {
      total += key.value
    }
    return total
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;

  }

  commit() {
    if (!this.isAllowed()) {
    console.log('Insufficient funds')
    return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}



class Deposit extends Transaction {

  get value () {
    return this.amount
  }

  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }

}

class Withdrawal extends Transaction {

  get value () {
    return -this.amount
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
