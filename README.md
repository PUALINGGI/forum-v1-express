# END Points #

## # USER ENDPOINTS
* ### GET METHODS
   * #### GET Users
      >GET protocol://host:port/user

      Mengembalikan data user semua.
   * #### GET User By ID
      >GET protocol://host:port/user/:id
      
      Dimana ID merupakan Object ID yang valid
   * #### GET User By QUERY
      >GET protocol://host:post/user/query?id=ObjectId&nama=string&password=string

      Jika terdapat (id) hasil di kembalikan berdasarkan ID. Jika hanya (nama) dan (Password) hasil di kembalikan bersdasarkan itu.
* ### POST METHODS
   * #### POST User By ID
      >POST protocol://host:port/user/:id

      Dimana (id) merupakan ObjectId yang valid.

      BODY REQUEST :
      
         { nama:String, password:String }

      Dimana [nama, password] di haruskan.
* ### PUT METHODS
   * #### PUT User By ID
      >PUT protocol://user/:id

      Dimana (id) merupakan valid ObjectId.

      BODY REQUEST :

         { nama?:string, password?:string }

      Dimana salah satu dari [nama, password] harus di sertakan.
* ### DELETE METHODS
   * #### DELETE User By ID
      >DELETE protocol://host:port/user/:id

      Dimana (id) merupakan valid ObjectId.

## # POSTINGAN ENDPOINTS
* ### GET METHODS
   * #### GET postingan by ID
      >GET protocol:/host:port/post/:id

      Dimana (id) merupakan valid ObjectId. Data di kembalikan bersarkan ID.
   * #### GET postigan by user ID
      >GET protocol:/host:port/post/user/:id

      Dimana (id) merupakan USER ID. Data di kembalikan berdasarkan USER ID.
* ### POST METHODS
   * #### POST postingan by user ID
      >POST protocol://host:port/post/:id

      Dimana (id) merupakan USER ID.

      REQUEST BODY :
         
         { content:String }
* ### UPDATE METHODS
   * #### UPDATE postingan content by ID
      >PUT protocol:/host:port/post/edit/:id

      Dimana (id) merupakan POSTINGAN ID.

      REQUEST BODY :

         { content:"String" }
   * #### UPDATE postingan add COMMENT by ID
      >PUT protocol:/host:port/post/comment/add/:id

      Dimana (id) merupakan POSTINGAN ID.

      REQUEST BODY :

         { user:ObjectId, comment:String }

      Dimana (user) merupakan ID dari user yang mengomentari postingan.
   * #### UPDATE postingan add LIKE by ID
      >PUT protocol:/host:port/post/likes/:id

      Dimana (id) merupakan POSTINGAN ID.

      REQUEST BODY :

         { like:Number } // -1 or 1

      Jika (1) maka LIKE akan bertambah dan jika (-1) LIKE akan berkurang.
* ### DELETE METHODS
   * #### DELETE postingan by ID
      >DELETE protocol:/host:port/post/:id

      Dimana (id) merupakan POSTINGAN ID.

      Ini termasuk menghapus semua komentar pada postingan.