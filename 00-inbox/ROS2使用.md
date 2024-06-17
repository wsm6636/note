---
tags:
  - 笔记
  - 待归档
  - 笔记/学习笔记
created: 2024-05-27T16:29:00
updated: 2024-06-17T11:11
status:
  - ing
---
## 域ID  ROS_DOMAIN_ID[](https://docs.ros.org/en/humble/Concepts/Intermediate/About-Domain-ID.html#the-ros-domain-id "链接至此标题")

如其他地方所述，ROS 2 用于通信的默认中间件是 DDS。在 DDS 中，让不同的逻辑网络共享物理网络的主要机制称为域 ID。**同一域上的 ROS 2 节点可以自由地发现并相互发送消息，而不同域上的 ROS 2 节点则不能**。默认情况下，所有 ROS 2 节点都使用域 ID 0。为了避免在同一网络上运行 ROS 2 的不同计算机组之间发生干扰，应为每个组设置不同的域 ID。

默认情况下，Linux 内核使用端口 32768-60999 作为临时端口。这意味着可以安全地使用域 ID 0-101 和 215-232，而不会与临时端口发生冲突。在 Linux 中，可以通过在 中设置自定义值来配置临时端口范围`/proc/sys/net/ipv4/ip_local_port_range`。如果使用自定义临时端口范围，则可能需要相应调整上述数字。

# 域配置
> 因为换成zsh
```
echo "export ROS_DOMAIN_ID=1" >> ~/.zshrc
echo "export ROS_LOCALHOST_ONLY=1" >> ~/.zshrc
```


# 工作区
### 1.设置ROS2环境变量

  工作空间的层次是通过环境变量来配置的，简单来说：下一个配置的工作空间会放到上一个配置的工作空间之上。   ROS2安装路径下的功能包一般会被我们设置为最下层的工作空间，所以我们在安装好ROS2之后，一定要记得在bashrc中设置如下ROS2安装路径的环境变量：

```
source /home/wsm/ros2_humble/install/setup.zsh
```



### 2.创建一个新的文件夹

  开发每一个项目的工作空间，最好是独立创建一个文件夹，文件夹的名字可以自由定义，比如我们来创建一个开发用的空间空间，就叫做dev_ws：

```
mkdir -p ~/dev_ws/src
cd ~/dev_ws/src
```

  这里的src就是未来放置所有功能包相关文件的位置。  

### 3.放置例程代码

  现在我们使用的终端已经cd到dev_ws/src路径下，接下来我们在这里先放置一些示例的功能包（下一篇会讲如何创建功能包）。

```
git clone https://github.com/ros/ros_tutorials.git -b humble
```

  稍等片刻， ros_tutorials 中的示例功能包就全部放到工作空间的src下边啦，其中我们可以看到这些内容：  [![](https://www.guyuehome.com/Uploads/wp/2020/08/a7c3df4abde45be608-19-14-04-20.png)](https://www.guyuehome.com/Uploads/wp/2020/08/a7c3df4abde45be608-19-14-04-20.png)  现在我们已经在工作空间中放置好了示例功能包，在编译运行之前，我们还需要配置好这些功能包的依赖。  

### 4.解决依赖问题

  在创建好功能包之后，我们最好养成一个比较好的习惯，就是先解决所有功能包的依赖，不然未来编译运行都会有很多问题。   ROS2也提供了自动化的依赖安装方式，需要我们在工作空间的根目录dev_ws下运行如下命令：

```
rosdep install -i --from-path src --rosdistro humble -y
```

  运行之后，会自动安装确实的依赖，如果依赖全部满足的话，就会显示：  [![](https://www.guyuehome.com/Uploads/wp/2020/08/832bbeb06cae0b3508-19-14-04-20.png)](https://www.guyuehome.com/Uploads/wp/2020/08/832bbeb06cae0b3508-19-14-04-20.png)  这里需要注意一点，以上自动化安装依赖的前提是：每个功能包已经完整的将所依赖的包和库在package.xml文件中声明了。  

### 5.编译工作空间

  接下来就可以编译代码啦，需要在工作空间的根目录dev_ws下运行：

```
colcon build
```

   colcon build后边还可以跟一些常用的参数：  

1. --packages-up-to ：编译指定的功能包，而不是整个工作空间
2. --symlink-install ：节省每次重建python脚本的时间
3. --event-handlers console_direct+ ：在终端中显示编译过程中的详细日志

  编译结束后，在dev_ws工作空间下，可以看到有几个新创建的文件夹：  [![](https://www.guyuehome.com/Uploads/wp/2020/08/d555223dcf26eee108-19-14-04-20.png)](https://www.guyuehome.com/Uploads/wp/2020/08/d555223dcf26eee108-19-14-04-20.png)  其中的install文件夹就是未来运行所有节点启动文件和脚本的位置。  

### 6.设置环境变量

  接下来需要重新打开一个终端，然后来设置dev_ws工作空间的环境变量。  

```
cd ~/dev_ws
. install/local_setup.sh
```

  install里有两个很类似的文件：local_setup.sh和setup.sh，前者仅会设置当前工作空间中功能包的相关环境变量，后者还会设置该工作空间下其他底层工作空间的环境变量。   现在我们就可以来运行dev_ws工作空间下的turtlesi功能包了

# gz
## 安装


# 线程
## 单线程

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301116817.png)

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301117923.png)

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301240996.png)
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405302010037.png)

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405302011410.png)


![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301553849.png)
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301604605.png)

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301554157.png)
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301604777.png)

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405301655785.png)
11
14

1. **追踪工具的展示方式**： 追踪工具可能会以不同的方式展示线程信息。有些工具可能会展示所有线程，包括那些由操作系统或语言运行时创建的线程，这可能导致你看到比预期更多的线程。

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405302040493.png)
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405302041984.png)
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405302043552.png)

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405302052354.png)

![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202405302053956.png)
9
12

# 测试
## 线程
```
cd ros2ws/executors 
source ./install/setup.zsh   
```
**单线程执行器**
```
ros2 run examples_rclpy_executors callback  
```

**多线程执行器**
```
ros2 run examples_rclpy_executors callback_group 
```

## gazebo
1. 新建机器人
```
ign gazebo -v 4 -r visualize_lidar.sdf
```
2. 查看主题 
```
ign topic -l
```
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202406031231103.png)
3. 查看机器人主题   
```
ros2 topic list
```
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202406031232002.png)
4. 配置ros2, 网络桥通信
```
ros2 run ros_gz_bridge parameter_bridge /model/vehicle_blue/cmd_vel@geometry_msgs/msg/Twist]ignition.msgs.Twist
```
- `@` is a bidirectional bridge.
- `[` is a bridge from Gazebo to ROS.
- `]` is a bridge from ROS to Gazebo

5. 控制gz，
	- 发送命令
```
ros2 topic pub /model/vehicle_blue/cmd_vel geometry_msgs/Twist "linear: { x: 0.1 }"
```
- 键盘
```
ros2 run teleop_twist_keyboard teleop_twist_keyboard --ros-args -r /cmd_vel:=/model/vehicle_blue/cmd_vel
```
6. 可视雷达，另一个桥接
```
ros2 run ros_gz_bridge parameter_bridge /lidar2@sensor_msgs/msg/LaserScan@ignition.msgs.LaserScan --ros-args -r /lidar2:=/laser_scan
```
7. rviz2
新终端
```
rviz2
```
![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202406031245694.png)


![image.png](https://raw.githubusercontent.com/wsm6636/pic/main/202406031240487.png)

# linux
```
sudo chrt -d -p 0  -T 5000000 -D 10000000 -P 16666666 84721  
```

