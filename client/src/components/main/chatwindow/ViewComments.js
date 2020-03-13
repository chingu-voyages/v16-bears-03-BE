import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { ChatContext } from './ChatWindow';
import { AppContext } from '../AppContainer';

/*
Requests all comments from database and handles  socket events  
*/

//keeps overflow scroll at the bottom of container

const scrollToBottom = ref => {
  ref.current.scrollTop = ref.current.scrollHeight;
};

const ViewComments = props => {
  const refContainer = useRef(null);
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { chatState } = useContext(ChatContext);
  const { socket, appState } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (appState.channel.comments) {
        setAllComments(() =>{
          return appState.channel.comments.map(comment =>{
            comment.channelID = appState.channel.id
            
            return comment
          })});
        
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [appState]);

  //Initialize client socket event listeners. Handles all post, edit and delete comment events.

  useEffect(() => {

    //threaded comments live update in ViewComments 
    socket.on('post_thread', thread =>{
    
      setAllComments(prev=>{
        return prev.map(comment =>{
          if(comment._id ===thread.commentid){
            if(comment.thread){
            comment.thread = comment.thread.concat(thread)}
            else{
              comment.thread = [thread]
            }
          }
          return comment
        })
      })
    })

    socket.on('delete_thread', (data)=>{
    
      setAllComments(prev=>{
        return prev.map(comment =>{
       
          if(comment._id === data.parentID){
            comment.thread = comment.thread.filter(thread =>{
              return thread._id !== data.id
            })
          }
          return comment
        })
      })
    } )

    socket.on('edit_thread', data =>{
      
      setAllComments(prev=>{
        return prev.map(comment =>{
    
          if(comment._id === data.parentID){
            comment.thread.forEach(thread =>{
              if (thread._id === data.id){
                thread.text = data.text
              }

            })
          }
          return comment
        })
      })

    })

    //non-threaded comments live updates

    socket.on('post', comment => {
      setAllComments(prev => prev.concat([comment]));
    });

    socket.on('edit', editedComment => {
      setAllComments(prev => {
        return prev.map(comment => {
          if (comment._id === editedComment._id) {
            return editedComment;
          } else {
            return comment;
          }
        });
      });
    });

    socket.on('delete', id => {
      setAllComments(prev => {
        return prev.filter(comment => comment._id !== id);
      });
    });

    socket.on('updateUser', ({ id, name, userImage }) => {
      setAllComments(prev => {
        return prev.map(comment => {
          if (comment.user_id === id) {
            if (name) {
              comment.user = name;
            }

            if (userImage) {
              comment.userImage = userImage;
            }
            return comment;
          }
          return comment;
        });
      });
    });
  }, [socket]);

  useEffect(() => {
    if (chatState.newComment) {
      scrollToBottom(refContainer);
    }
  });

  return (
    <Wrapper ref={refContainer}>
      {/*hardcoded channel section */}

      <ChannelSection>
        <Name>#Slack Clone</Name>
        <Description>
          <ChannelLink href="https://github.com/chingu-voyages/v16-bears-03-BE" target="_blank">
            Bears-Team-03
          </ChannelLink>{' '}
          created this channel on February 8th. This is the very beginning of the #Slack Clone
          channel.
        </Description>
      </ChannelSection>

      {isLoading && <div>Loading...</div>}
      {isError ? (
        <div>"Something Went Wrong"</div>
      ) : (
        allComments.map(comment => {
          console.log(comment.channelID)
          return (
            <Comment
              id={comment._id}
              key={comment._id}
              userImage={comment.userImage}
              name={comment.user}
              date={comment.date}
              text={comment.text}
              isEdited={comment.isEdited}
              user_id={comment.user_id}
              thread={comment.thread}
              refContainer={refContainer}
              setThreadWindow={props.setThreadWindow}
              getThreadInfo={props.getThreadInfo}
              channelID = {comment.channelID}
            ></Comment>
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow: auto;
  border-top: 0.1rem solid rgb(29, 28, 29, 0.3);
  padding: 1rem 0rem;
  scrollbar-color: #919191;
  scrollbar-width: thin;
  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    border: 0.01rem solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0.7rem;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
    border: 0.1rem solid #919191;
    background: #919191;
  }
`;

const Name = styled.span`
  margin-left: 1rem;
  font-size: 2.2rem;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const ChannelSection = styled.section`
  border-bottom: 0.1rem solid rgb(29, 28, 29, 0.3);
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ChannelLink = styled.a`
  background-color: rgb(29, 155, 209, 0.1);
  color: rgb(18, 100, 163, 1);
  border: 0;
  border-radius: 0.3rem;
`;

export default ViewComments;
