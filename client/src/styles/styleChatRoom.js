export default (theme) => ({
    chatRoomContainer: {
        //position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'column',
        margin: '16px',

    },

    roomName: {
        textAlign: 'center',
        marginTop: '0',
    },

    messagesContainer: {
        fontFamily: 'Arial',
        flex: '1',
        minHeight: '100px',
        overflow: 'auto',
        border: '1px solid black',
        borderRadius: '7px 7px 0 0'
    },

    messagesList: {
        listStyleType: 'none',
        padding: '0'
    },

    newMessageInputField: {
        fontFamily: 'Arial',
        height: '200px',
        maxHeight: '50%',
        fontSize: '20px',
        padding: '8px 12px',
        resize: 'none'
    },

    messageItem: {
        fontFamily: 'Arial',
        width: '55%',
        margin: '8px',
        padding: '12px 8px',
        wordBreak: 'break-word',
        borderRadius: '4px',
        color: 'white'
    },

    myMessage: {
        fontFamily: 'Arial',
        backgroundColor: 'rgb(0, 132, 255)',
        marginLeft: 'auto',

        width: '55%',
        margin: '8px',
        padding: '12px 8px',
        wordBreak: 'break-word',
        borderRadius: '4px',
        color: 'white'
    },

    receivedMessage: {
        fontFamily: 'Arial',
        backgroundColor: '#3f4042',
        marginRight: 'auto',

        width: '55%',
        margin: '8px',
        padding: '12px 8px',
        wordBreak: 'break-word',
        borderRadius: '4px',
        color: 'white'
    },

    sendMessageButton: {
        fontSize: '28px',
        fontWeight: '600',
        color: 'white',
        background: '#31a24c',
        padding: '24px 12px',
        border: 'none'
    },

    messagesContainer: {
        borderColor: '#9a9a9a'
    },

    newMessageInputField: {
        borderColor: '#9a9a9a'
    },

    sendMessageButton: {
        borderColor: '#9a9a9a'
    }
});