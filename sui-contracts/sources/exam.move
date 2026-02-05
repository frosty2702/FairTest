module fairtest::exam {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::clock::{Self, Clock};
    use std::string::{String};

    /// Exam status constants
    const STATUS_ACTIVE: u8 = 1;
    const STATUS_COMPLETED: u8 = 2;
    const STATUS_CANCELLED: u8 = 3;

    /// ExamObject stores immutable exam metadata
    struct ExamObject has key, store {
        id: UID,
        exam_id: vector<u8>,
        creator: address,
        ens_name: String,
        exam_fee: u64,
        status: u8,
        timestamp: u64
    }

    /// Create a new exam and share it publicly
    public entry fun create_exam(
        exam_id: vector<u8>,
        ens_name: String,
        exam_fee: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let exam = ExamObject {
            id: object::new(ctx),
            exam_id,
            creator: tx_context::sender(ctx),
            ens_name,
            exam_fee,
            status: STATUS_ACTIVE,
            timestamp: clock::timestamp_ms(clock)
        };
        transfer::share_object(exam);
    }

    /// Get exam creator address
    public fun get_creator(exam: &ExamObject): address {
        exam.creator
    }

    /// Get exam fee
    public fun get_fee(exam: &ExamObject): u64 {
        exam.exam_fee
    }

    /// Get exam status
    public fun get_status(exam: &ExamObject): u8 {
        exam.status
    }
}
