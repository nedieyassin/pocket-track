-- Calculate wallet balance on insert , update
CREATE
    OR REPLACE FUNCTION calculate_wallet_balance(wallet_id UUID)
    RETURNS DECIMAL AS
$$
DECLARE
    total DECIMAL;
BEGIN
    SELECT COALESCE(SUM(amount), 0)
    INTO total
    FROM "Transaction"
    WHERE "Transaction"."walletId" = $1;

    RETURN total;
END;
$$
    LANGUAGE plpgsql;



CREATE
    OR REPLACE FUNCTION update_wallet_balance()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE "Wallet"
    SET balance = calculate_wallet_balance(NEW."walletId")
    WHERE id = NEW."walletId";

    RETURN NEW;
END;
$$
    LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_balance_trigger
    AFTER INSERT OR
        UPDATE
    ON "Transaction"
    FOR EACH ROW
EXECUTE FUNCTION update_wallet_balance();


-- Calculate wallet balance on delete
CREATE
    OR REPLACE FUNCTION delete_wallet_balance()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE "Wallet"
    SET balance = calculate_wallet_balance(OLD."walletId")
    WHERE id = OLD."walletId";

    RETURN OLD;
END;
$$
    LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER delete_balance_trigger
    AFTER  DELETE
    ON "Transaction"
    FOR EACH ROW
EXECUTE FUNCTION delete_wallet_balance();