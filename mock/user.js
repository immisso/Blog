export default {
  'POST /api/register': (req, res) => {
    // 注册的逻辑
  },
  'POST /api/login': (req, res) => {
    const data = req.body;
    if( data.email === 'qiye@test.com' && data.password === 'qiye123456') {
      return res.json({
        data:{
          avatar: "https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/003.png",
          email: "qiye@test.com",
          level: 1,
          nickname: "柒叶",
          profession: "全栈工程师",
          total_comment: 0,
          total_like: 2,
          total_view: 0,
          user_id: 199,
          expire: 2 * 60 * 60
        },
        error_code:1000
      })
    }
  }
}