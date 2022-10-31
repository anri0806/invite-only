class PostsController < ApplicationController
 rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    def index
        posts = Post.all
        
        render json: posts, include: ['images'], status: :ok
    end

    def group_posts
        posts = Post.where(group_id: params[:id])
        render json: posts, status: :ok
    end

    def user_posts
        posts = Post.where(user_id: params[:id])
        render json: posts, status: :ok
    end

    def show
        post = Post.find_by(id: params[:id])
        render json: post, status: :ok
    end

    def create
        post = Post.create(post_params)

        if post.valid?
            render json: post, status: :created
        else
            render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        post = Post.find_by(id: params[:id])
        
        if post
            post.update!(caption: params[:caption])
            render json: post, status: :created           
        else
            render json: {errors: "Comment not found"}, status: :not_found
        end
    end

    def destroy
        post = Post.find_by(id: params[:id])
        if post
            post.destroy
            head :no_content
        else
            render json: {error: "Post not fonud"}, status: :not_found
        end
        
    end

    private

    def post_params
        params.permit(:caption, :picture, :user_id, :group_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
