import validateMessage from "vee-validate/dist/locale/ja.json";

export default {
    home : {
        recommend:'お勧め',
        recommend_sub : 'あなたは私たちの人気のある部屋に興味があるかもしれません',
        slogan:'最高のサービスを予約する',
        slogan_sub:'ゲストからの 50.000 以上の表彰',
        single:'一人',
        single_sub:'唯一無二のサービスをお楽しみください',
        couple:'二人',
        couple_sub:'あなたの両方のための完璧な選択',
        family:'家族',
        family_sub:'大きな部屋にしたいですか？ そこにいます'
    },
    room : {
        discount :'平日の価格',
        price:'休日の価格',
        description:'説明',
        amenities:'アメニティ',
        recommend:'お勧め',
        wifi:'Wi-Fi',
        tv:'テレビ',
        view:'素晴らしい景色',
        food:'朝ごはん',
        temperature:'エアコン',
        smoke:'喫煙禁止',
        bar:'バー',
        fridge :'フリーザー',
        child:'子供に優しい',
        service:'ルームサービス',
        sofa:'ソファー',
        pet:'ペットに優しい',
        in:'チェックインは午後 3 時から午後 7 時までです。',
        out:'チェックアウトは午前 11 時前です',
        night:'夜'
    },
    reserve : {
        info:'ユーザー情報',
        payment:'支払い',
        reserved:'予約済み',
        infoTitle:'ゲスト情報',
        paymentTitle:'支払方法',
        email:'メール',
        name:'名前',
        phone:'電話',
        next:'次のステップ',
        booking:'予約',
        in:'チェックイン',
        out:'チェックアウト',
        guest:'ゲスト',
        room:'ルーム',
        night:'夜',
        fee:'サービス料',
        total:'合計',
        success:'予約受付済み！',
        edit:'予約を編集する',
        home:'ホームページ',
        inputMail : 'メールアドレスを入力してください',
        inputName : 'お名前を入力してください',
        inputPhone : '電話番号を入力してください',
        creditName : 'クレジットカードのユーザー名を入力してください',
        credit : 'クレジットカード',
        cash : 'お金',
    },
    admin : {
        order:'注文プレビュー',
        all : '️全部',
        future:'将来',
        before:'この前',
        input:'検索対象を入力してください ...',
        number:'注文番号',
        status_checked:'チェック済み',
        status_available :'チェックインしていません',
        edit:'エディット',
        delete:'削除する',
        update:'更新する',
        confirm:'絶対によろしいですか ?',
        result : '検索結果 :',
        none : '注文が見つかりません',
        reset : 'フィルターをクリアして、もう一度お試しください'
    },
    order:{
        edit:'注文の編集',
        delete:'注文を削除'
    },
    navbar : {
        check : 'チェックインチェックアウト',
        room : 'ルーム',
        reserve : '予備',
        in : 'ログインする',
        out : 'サインアウト',
        style:'ルームスタイル',
        user : 'ユーザー',
        dashboard : 'ダッシュボード'

    },
    calendar : {
        check:'チェックイン',
        room:'ルーム',
        reserve:'予備',
        fee:'サービス料',
        night:'夜',
        total:'合計',
    },
    modal : {
        remember:'覚えて',
        log_in:'ログインする',
        log_txt:'すでにアカウントをお持ちですか ？',
        sign_up:'サインアップ',
        sign_txt:'サインアップ',
        notice:'続行することにより、あなたは私たちのを読んで同意しました ',
        terms:'利用規約とプライバシーポリシー',
        account:'アカウント',
        password:'パスワード'
    },  
    footer : {
        rights:'2022 HexHotel. 全著作権所有. のデザイナー',
        address:'住所番号。 5、高雄通り、高雄市803、台湾'
    },
    alert:{
        logIn:'ログイン成功',
        signUp:'サインアップ成功',
        remove:'削除成功',
        edit:'成功を編集'
    },
    // vee-validation
    fields: {
        validEmail: "メール",
        validPassword:"パスワード",
        validCreditCard:'クレジットカード番号',
        validExpired:'有効期限',
        validCode:'コード',
        validName:'有効な名前',
        validPhone:'電話番号',
        validConfirm:'入力フィールド'
    },
    validation: validateMessage.messages
}