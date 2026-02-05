module fairtest::submission {
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};
    use sui::transfer;
    use sui::clock::{Self, Clock};

    /// SubmissionObject stores anonymous exam submissions
    /// CRITICAL: Only UID_HASH is stored, never wallet addresses
    struct SubmissionObject has key, store {
        id: UID,
        uid_hash: vector<u8>,      // Double-hashed anonymous identifier
        exam_id: vector<u8>,        // Reference to exam
        answer_hash: vector<u8>,    // Hash of student answers
        timestamp: u64              // Submission time
    }

    /// Create anonymous submission
    /// Privacy guarantee: No wallet address or PII stored
    public entry fun create_submission(
        uid_hash: vector<u8>,
        exam_id: vector<u8>,
        answer_hash: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let submission = SubmissionObject {
            id: object::new(ctx),
            uid_hash,
            exam_id,
            answer_hash,
            timestamp: clock::timestamp_ms(clock)
        };
        transfer::share_object(submission);
    }

    /// Get submission UID_HASH (for evaluator viewing)
    public fun get_uid_hash(submission: &SubmissionObject): vector<u8> {
        submission.uid_hash
    }

    /// Get answer hash (for integrity verification)
    public fun get_answer_hash(submission: &SubmissionObject): vector<u8> {
        submission.answer_hash
    }
}
