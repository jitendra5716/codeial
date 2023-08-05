{
   let newPostForm =  $('#new-post-form');

   newPostForm.submit((e)=>{
    e.preventDefault();

    $.ajax({
        type:'post',
        url:'/posts/create',
        data:newPostForm.serialize(),
        success:(data)=>{
            let newPost = newPostDom(data.data.post);
            $('#postList_div>ul').prepend(newPost);
            deletePost($(' .delete-post-button', newPost));
        },
        error:(err)=>{
            console.log(err.responseText);
        }
    })
   })

   //showing the post to dom;

    const newPostDom = (post)=>{
        return $(
            `
            <li id="post-${ post._id }">
    
        <small>
            <a class="delete-post-button" href="/posts/delete/${post._id }">X</a>
        </small>
    
    <p>
    ${post.content }
        <br>
        <small>
        ${ post.user.name }
        </small>
    </p>
    <div>
        
        <form action="/comments/create" method="post">
            <input type="text" name="content" placeholder="Enter Comments Here..">
            <input type="hidden" name="post" value="${post._id }">
            <input type="submit" value="add comment"> 
        </form>

    </div>
    <div>
        <ul>

        </ul>
    </div>
</li>  `
        )
    }

    let deletePost = (deleteLink)=>{
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                method:'get',
                url:$(deleteLink).prop('href'),
                success:(data)=>{
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:(err)=>{
                    console.log(err.responseText);
                }
            })
        })
    }

    createPost();
}

