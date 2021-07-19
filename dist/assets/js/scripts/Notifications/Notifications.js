class NotificationTypes 
{
    constructor()
    {
        this.Success = "#64d189"
        this.Error = "#FF7171"
        this.Information = "#f5c56e"
    }
}

class Notification
{
    constructor(textToDisplay, notifType)
    {
        Toastify
        ({
            text: textToDisplay,
            gravity:'bottom',
            position:'center',
            duration: 1500,
            close:true,
            backgroundColor:notifType
        }).showToast()
    }
}

export {Notification, NotificationTypes};