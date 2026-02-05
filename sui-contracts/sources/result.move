module fairtest::result {
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};
    use sui::transfer;
    use sui::clock::{Self, Clock};

    /// ResultObject stores evaluation results
    /// CRITICAL: Only UID_HASH is stored, never wallet addresses
    struct ResultObject has key, store {
        id: UID,
        uid_hash: vector<u8>,      // Double-hashed anonymous identifier
        exam_id: vector<u8>,        // Reference to exam
        score: u64,                 // Student score
        rank: u64,                  // Global rank
        timestamp: u64              // Result publication time
    }

    /// Publish evaluation result
    /// Privacy guarantee: No wallet address or PII stored
    public entry fun publish_result(
        uid_hash: vector<u8>,
        exam_id: vector<u8>,
        score: u64,
        rank: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let result = ResultObject {
            id: object::new(ctx),
            uid_hash,
            exam_id,
            score,
            rank,
            timestamp: clock::timestamp_ms(clock)
        };
        transfer::share_object(result);
    }

    /// Get result score
    public fun get_score(result: &ResultObject): u64 {
        result.score
    }

    /// Get result rank
    public fun get_rank(result: &ResultObject): u64 {
        result.rank
    }

    /// Get UID_HASH (for student result lookup)
    public fun get_uid_hash(result: &ResultObject): vector<u8> {
        result.uid_hash
    }
}
