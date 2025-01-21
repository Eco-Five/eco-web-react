/************************* 공지사항 글목록 ***************************/
router.get("/notice", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page
        const perPage = 10; // Number of notices per page
        const offset = (page - 1) * perPage; // Calculate the offset
        console.log("Pagination values:", { page, perPage, offset });

        let rows = [];
        let totalNotices = 0;

        // Fetch notices
        try {
            const sql = `
            SELECT b.notice_id AS id, b.title, b.notice_date, m.name AS member_name, c.type_name AS category
            FROM notice b
            LEFT JOIN member m ON b.member_id = m.member_id
            LEFT JOIN content_type c ON b.content_type_id = c.content_type_id
            ORDER BY b.notice_id DESC
            LIMIT ${perPage} OFFSET ${offset};
            `;
            const [result] = await pool.execute(sql); // Execute the query
            rows = result;
        } catch (queryError) {
            console.error("Error fetching notices:", queryError);
        }

        // Fetch total count
        try {
            const totalSql = `SELECT COUNT(*) AS total FROM notice`;
            const [totalResult] = await pool.execute(totalSql);
            totalNotices = totalResult[0]?.total || 0; // Get total number of notices
        } catch (countError) {
            console.error("Error fetching total count:", countError);
        }

        const totalPages = Math.ceil(totalNotices / perPage); // Calculate total pages

        // Render the notice page with data
        res.render("index", {
            title: "공지사항목록",
            pageName: "notice/notice.ejs",
            notices: rows,
            currentPage: page,
            totalPages,
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).send("Internal Server Error");
    }
});


/************************* 공지사항 글작성 ***************************/
router.post("/notice/write", async (req, res) => {
    try {
        // Retrieve user info from session
        const user = req.session.user;

        if (!user || !user.isAuthenticated) {
            return res.status(401).json({ success: false, message: "User is not logged in." });
        }

        const member_id = user.member_id; // Get the logged-in member ID
        const { category, title, content } = req.body;

        // Validate input
        if (!category || !title || !content) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Insert into database
        const sql = `
            INSERT INTO notice (content_type_id, title, content, notice_date, member_id)
            VALUES ((SELECT content_type_id FROM content_type WHERE type_name = ?), ?, ?, NOW(), ?);
        `;

        const [result] = await pool.execute(sql, [category, title, content, member_id]);

        if (result.affectedRows === 1) {
            return res.status(200).json({ success: true, message: "Notice successfully created." });
        } else {
            return res.status(500).json({ success: false, message: "Failed to create the notice." });
        }
    } catch (error) {
        console.error("Error creating notice:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
});


/************************* 공지사항 상세보기 ***************************/
router.get("/notice/:b_no", async (req, res) => {
    const b_no = req.params.b_no;

    // Validate that `b_no` is numeric
    if (isNaN(b_no)) {
        return res.status(400).json({ message: "Invalid notice ID." });
    }

    if (!b_no) {
        return res.status(400).send({ message: "게시글 번호가 누락되었습니다." });
    }

    try {
        // Increment the views column
        const updateSql = `UPDATE notice SET views = views + 1 WHERE notice_id = ?`;
        await pool.execute(updateSql, [b_no]);

        // Fetch the updated article details
        const selectSql = `
            SELECT b.notice_id AS id, b.title, b.notice_date AS date, b.content, b.views, 
            m.name AS member_name, c.type_name AS category
            FROM notice b
            LEFT JOIN member m ON b.member_id = m.member_id
            LEFT JOIN content_type c ON b.content_type_id = c.content_type_id
            WHERE b.notice_id = ?;
        `;
        const [rows] = await pool.execute(selectSql, [b_no]);

        if (rows.length === 0) {
            return res.status(404).send({ message: "해당 글이 없습니다." });
        }

        const notice = rows[0];

        res.render("index", {
            title: "공지사항 상세보기",
            pageName: "notice/read.ejs",
            notice,
        });
    } catch (error) {
        console.error("Error fetching notice details:", error);
        res.status(500).send("Internal Server Error");
    }
});

/************************* 공지사항글수정-GET ***************************/
router.get('/notice/update/:b_no', async (req, res) => {
    
    const b_no = req.params.b_no;

    try {
        console.log("Fetching notice for b_no:", b_no);

        const sql = `
            SELECT
                n.notice_id,
                n.title,
                n.content,
                c.type_name AS category
            FROM
                notice n
            JOIN
                content_type c
                ON n.content_type_id = c.content_type_id
            WHERE
                n.notice_id = ?;
        `;

        const [rows] = await pool.execute(sql, [b_no]);

        console.log("SQL Result Rows:", rows);

        if (rows.length > 0) {
            const notice = rows[0];
            res.render("index", {
                title: "공지사항 수정",
                pageName: "notice/update.ejs",
                notice,
            });
        } else {
            res.status(404).send("Notice not found.");
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

/************************* 공지사항글수정-PUT ***************************/
router.put('/notice/update/:b_no', async (req, res) => {
    const b_no = req.params.b_no;
    const { category, title, content } = req.body;

    console.log('PUT Request Received:', { b_no, body: req.body }); // Debug log

    if (!category || !title || !content) {
        console.error("Validation Error: Missing fields:", req.body);
        return res.status(400).json({ success: false, message: "필수 필드를 채우세요." });
    }

    try {
        const sql = `
            UPDATE notice
            SET
                title = ?,
                content = ?,
                content_type_id = (SELECT content_type_id FROM content_type WHERE type_name = ?)
            WHERE notice_id = ?;
        `;
        const values = [title, content, category, b_no];
        const [result] = await pool.execute(sql, values);

        console.log("Update Result:", result);
        res.json({ success: true, message: "수정 완료되었습니다.", result });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "글 수정 처리 중 오류가 발생했습니다.", error });
    }
});

// 공지사항 삭제 - DELETE
router.delete('/notice/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const sql = `DELETE FROM notice WHERE notice_id = ?`;
        const [result] = await pool.execute(sql, [id]);

        if (result.affectedRows > 0) {
            console.log(`Notice ${id} deleted successfully.`);
            res.json({ success: true, message: "삭제 완료되었습니다." });
        } else {
            res.status(404).json({ success: false, message: "해당 공지사항을 찾을 수 없습니다." });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
});